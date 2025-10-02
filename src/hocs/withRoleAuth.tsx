/**
 * Higher-Order Component for role-based access control
 * Demonstrates: HOCs, TypeScript generics, role-based authorization
 */
'use client'

import React, { ComponentType } from 'react'
import { useSession } from 'next-auth/react'
import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'

export type UserRole = 'admin' | 'manager' | 'user' | 'guest'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  permissions: string[]
}

interface WithRoleAuthOptions {
  allowedRoles: UserRole[]
  requiredPermissions?: string[]
  fallbackComponent?: ComponentType
  redirectTo?: string
}

interface AuthComponentProps {
  user: User | null
  hasAccess: boolean
}

function withRoleAuth<P extends object>(
  WrappedComponent: ComponentType<P & AuthComponentProps>,
  options: WithRoleAuthOptions
) {
  const {
    allowedRoles,
    requiredPermissions = [],
    fallbackComponent: FallbackComponent,
    redirectTo = '/login'
  } = options

  const WithRoleAuthComponent = (props: P) => {
    const { data: session, status } = useSession()
    
    // Mock user data - in real app, this would come from session or API
    const user: User | null = session?.user ? {
      id: (session.user as any).id || '1',
      email: session.user.email || '',
      name: session.user.name || '',
      role: (session.user as any).role || 'user',
      permissions: (session.user as any).permissions || []
    } : null

    const hasRoleAccess = user ? allowedRoles.includes(user.role) : false
    
    const hasPermissionAccess = requiredPermissions.length === 0 || 
      requiredPermissions.every(permission => user?.permissions.includes(permission))
    
    const hasAccess = hasRoleAccess && hasPermissionAccess

    // Loading state
    if (status === 'loading') {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '200px' 
        }}>
          <Typography>Loading...</Typography>
        </Box>
      )
    }

    // Not authenticated
    if (!session) {
      return (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Required
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Please log in to access this page.
          </Typography>
          <Button
            component={Link}
            href={redirectTo}
            variant="contained"
            color="primary"
          >
            Go to Login
          </Button>
        </Box>
      )
    }

    // Not authorized
    if (!hasAccess) {
      if (FallbackComponent) {
        return <FallbackComponent />
      }

      return (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h6" gutterBottom color="error">
            Access Denied
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            You don't have permission to access this resource.
          </Typography>
          <Typography variant="caption" display="block" sx={{ mb: 2 }}>
            Required roles: {allowedRoles.join(', ')}
            {requiredPermissions.length > 0 && (
              <span> | Required permissions: {requiredPermissions.join(', ')}</span>
            )}
          </Typography>
          <Button
            component={Link}
            href="/dashboard"
            variant="outlined"
          >
            Back to Dashboard
          </Button>
        </Box>
      )
    }

    // Authorized - render the component
    return <WrappedComponent {...props} user={user} hasAccess={hasAccess} />
  }

  WithRoleAuthComponent.displayName = `withRoleAuth(${WrappedComponent.displayName || WrappedComponent.name})`

  return WithRoleAuthComponent
}

export default withRoleAuth

// Utility function to check permissions
export function hasPermission(user: User | null, permission: string): boolean {
  return user?.permissions.includes(permission) ?? false
}

// Utility function to check role
export function hasRole(user: User | null, role: UserRole): boolean {
  return user?.role === role
}

// Utility function to check if user has any of the specified roles
export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  return user ? roles.includes(user.role) : false
}
