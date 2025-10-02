/**
 * Context for application-wide error handling and logging
 * Demonstrates: Context API, Error Boundaries, TypeScript patterns
 */
'use client'

import React, { createContext, useContext, useCallback, useState, ReactNode } from 'react'

export interface AppError {
  id: string
  message: string
  stack?: string
  timestamp: Date
  severity: 'low' | 'medium' | 'high' | 'critical'
  context?: Record<string, any>
  userId?: string
}

interface ErrorContextValue {
  errors: AppError[]
  logError: (error: Error | string, severity?: AppError['severity'], context?: Record<string, any>) => void
  clearError: (id: string) => void
  clearAllErrors: () => void
  getErrorsBySeveity: (severity: AppError['severity']) => AppError[]
}

const ErrorContext = createContext<ErrorContextValue | null>(null)

export function useError() {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

interface ErrorProviderProps {
  children: ReactNode
  onError?: (error: AppError) => void
  maxErrors?: number
}

export function ErrorProvider({ 
  children, 
  onError,
  maxErrors = 50 
}: ErrorProviderProps) {
  const [errors, setErrors] = useState<AppError[]>([])

  const logError = useCallback((
    error: Error | string,
    severity: AppError['severity'] = 'medium',
    context?: Record<string, any>
  ) => {
    const appError: AppError = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date(),
      severity,
      context,
      userId: context?.userId
    }

    setErrors(prev => {
      const newErrors = [appError, ...prev].slice(0, maxErrors)
      return newErrors
    })

    // Call external error handler if provided
    onError?.(appError)

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const logMethod = severity === 'critical' ? 'error' : 
                       severity === 'high' ? 'warn' : 'log'
      
      console.group(`🚨 Error [${severity.toUpperCase()}]`)
      console[logMethod](appError.message)
      if (appError.stack) console.log('Stack:', appError.stack)
      if (appError.context) console.log('Context:', appError.context)
      console.groupEnd()
    }

    // Send to external error tracking service in production
    if (process.env.NODE_ENV === 'production' && severity === 'critical') {
      // Example: Send to Sentry, LogRocket, etc.
      // Sentry.captureException(error, { extra: context })
    }
  }, [onError, maxErrors])

  const clearError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id))
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors([])
  }, [])

  const getErrorsBySeveity = useCallback((severity: AppError['severity']) => {
    return errors.filter(error => error.severity === severity)
  }, [errors])

  const value: ErrorContextValue = {
    errors,
    logError,
    clearError,
    clearAllErrors,
    getErrorsBySeveity
  }

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  )
}
