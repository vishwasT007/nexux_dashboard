/**
 * Error Boundary component with TypeScript and advanced error handling
 * Demonstrates: Error Boundaries, TypeScript classes, Lifecycle methods
 */
'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Alert, AlertTitle, Button, Box, Typography } from '@mui/material'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number | boolean | null | undefined>
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  eventId: string | null
}

class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null

  constructor(props: Props) {
    super(props)
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const eventId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    this.setState({
      errorInfo,
      eventId
    })

    // Call the onError prop if provided
    this.props.onError?.(error, errorInfo)

    // Log error details
    console.group('🔥 Error Boundary Caught Error')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Component Stack:', errorInfo.componentStack)
    console.groupEnd()

    // Send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props
    const { hasError } = this.state

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, index) => key !== prevProps.resetKeys?.[index])) {
        this.resetErrorBoundary()
      }
    }

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary()
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    })
  }

  handleRetry = () => {
    this.resetErrorBoundary()
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    const { hasError, error, errorInfo, eventId } = this.state
    const { children, fallback } = this.props

    if (hasError) {
      if (fallback) {
        return fallback
      }

      return (
        <Box 
          sx={{ 
            p: 4, 
            maxWidth: 600, 
            mx: 'auto', 
            mt: 4,
            textAlign: 'center'
          }}
        >
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Something went wrong</AlertTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              An unexpected error occurred. This has been logged and our team will investigate.
            </Typography>
            
            {process.env.NODE_ENV === 'development' && error && (
              <Box sx={{ mt: 2, textAlign: 'left' }}>
                <Typography variant="subtitle2" color="error">
                  Error Details (Development Only):
                </Typography>
                <Typography 
                  variant="body2" 
                  component="pre" 
                  sx={{ 
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    p: 1,
                    borderRadius: 1,
                    mt: 1
                  }}
                >
                  {error.message}
                  {errorInfo?.componentStack}
                </Typography>
              </Box>
            )}
            
            {eventId && (
              <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.7 }}>
                Error ID: {eventId}
              </Typography>
            )}
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
            <Button 
              variant="outlined" 
              onClick={this.handleReload}
            >
              Reload Page
            </Button>
          </Box>
        </Box>
      )
    }

    return children
  }
}

export default ErrorBoundary
