/**
 * Advanced TypeScript utility types and interfaces for the application
 * Demonstrates: Complex types, generics, conditional types, mapped types
 */

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Make all properties of T optional recursively
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Make all properties of T required recursively
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

// Extract keys of T where the value type is assignable to U
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

// Create a type with only the properties of T where the value type is assignable to U
export type PickByType<T, U> = Pick<T, KeysOfType<T, U>>

// Omit properties of T where the value type is assignable to U
export type OmitByType<T, U> = Omit<T, KeysOfType<T, U>>

// Make specific properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Make specific properties required
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
  timestamp: string
  errors?: string[]
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiError {
  code: string
  message: string
  field?: string
  details?: Record<string, any>
}

// Generic API request configuration
export interface ApiRequestConfig<TParams = any, TData = any> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  params?: TParams
  data?: TData
  headers?: Record<string, string>
  timeout?: number
  retries?: number
}

// ============================================================================
// ENTITY TYPES
// ============================================================================

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface User extends BaseEntity {
  email: string
  name: string
  avatar?: string
  role: UserRole
  permissions: Permission[]
  status: UserStatus
  lastLoginAt?: string
  preferences: UserPreferences
}

export type UserRole = 'admin' | 'manager' | 'user' | 'guest'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: PermissionAction
}

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'admin'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormField<T = any> {
  name: string
  label: string
  type: FormFieldType
  value: T
  required?: boolean
  disabled?: boolean
  placeholder?: string
  helperText?: string
  error?: string
  validation?: ValidationRule[]
  options?: SelectOption[]
  dependencies?: string[]
}

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'select' 
  | 'multiselect'
  | 'checkbox' 
  | 'radio' 
  | 'date' 
  | 'datetime'
  | 'file' 
  | 'textarea'
  | 'rich-text'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  value?: any
  message: string
  validator?: (value: any) => boolean | Promise<boolean>
}

export interface FormState<T = Record<string, any>> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
}

// ============================================================================
// TABLE/GRID TYPES
// ============================================================================

export interface TableColumn<T = any> {
  id: keyof T
  label: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  filterable?: boolean
  searchable?: boolean
  format?: (value: any, row: T) => React.ReactNode
  render?: (value: any, row: T) => React.ReactNode
}

export interface TableFilter {
  field: string
  operator: FilterOperator
  value: any
  type: 'text' | 'number' | 'date' | 'select' | 'boolean'
}

export type FilterOperator = 
  | 'equals' 
  | 'not_equals' 
  | 'contains' 
  | 'not_contains'
  | 'starts_with' 
  | 'ends_with'
  | 'greater_than' 
  | 'less_than'
  | 'greater_equal' 
  | 'less_equal'
  | 'in' 
  | 'not_in'
  | 'is_null' 
  | 'is_not_null'

export interface TableSort {
  field: string
  direction: 'asc' | 'desc'
}

export interface TableState<T = any> {
  data: T[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    rowsPerPage: number
    total: number
  }
  filters: TableFilter[]
  sort: TableSort[]
  selection: string[]
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ComponentWithChildren {
  children: React.ReactNode
}

export interface ComponentWithClassName {
  className?: string
}

export interface ComponentWithLoading {
  loading?: boolean
}

export interface ComponentWithError {
  error?: string | null
}

export interface ComponentWithSize {
  size?: 'small' | 'medium' | 'large'
}

export interface ComponentWithVariant {
  variant?: 'contained' | 'outlined' | 'text'
}

export interface ComponentWithColor {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

// Combine common component props
export type BaseComponentProps = 
  & ComponentWithChildren 
  & ComponentWithClassName 
  & ComponentWithLoading 
  & ComponentWithError

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface AppEvent<T = any> {
  type: string
  payload: T
  timestamp: string
  source: string
  userId?: string
}

export interface UserEvent extends AppEvent {
  type: 'user.login' | 'user.logout' | 'user.register' | 'user.update'
  payload: {
    userId: string
    email: string
    metadata?: Record<string, any>
  }
}

export interface SystemEvent extends AppEvent {
  type: 'system.error' | 'system.warning' | 'system.info'
  payload: {
    message: string
    code?: string
    details?: Record<string, any>
  }
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface AppConfig {
  app: {
    name: string
    version: string
    environment: 'development' | 'staging' | 'production'
    baseUrl: string
  }
  auth: {
    providers: string[]
    sessionTimeout: number
    refreshTokenEnabled: boolean
  }
  api: {
    baseUrl: string
    timeout: number
    retries: number
  }
  features: {
    [key: string]: boolean
  }
  ui: {
    theme: {
      mode: 'light' | 'dark' | 'system'
      primaryColor: string
      secondaryColor: string
    }
    layout: {
      sidebar: boolean
      header: boolean
      footer: boolean
    }
  }
}

// ============================================================================
// ASYNC STATE TYPES
// ============================================================================

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
  lastFetch?: string
}

export type AsyncAction<T> = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' }

// ============================================================================
// CONDITIONAL TYPES EXAMPLES
// ============================================================================

// Extract function types
export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

// Extract non-function types
export type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]

// Create a type that represents the return type of all methods in T
export type MethodReturnTypes<T> = {
  [K in FunctionKeys<T>]: T[K] extends (...args: any[]) => infer R ? R : never
}

// Create a type that makes all function properties optional
export type OptionalMethods<T> = Pick<T, NonFunctionKeys<T>> & Partial<Pick<T, FunctionKeys<T>>>

export default {}
