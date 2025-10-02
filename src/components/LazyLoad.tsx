/**
 * Simplified lazy loading wrapper component
 * Demonstrates: Dynamic imports, Suspense, Error boundaries, Performance optimization
 */
'use client'

import React, { Suspense, lazy, ComponentType } from 'react'
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material'
import ErrorBoundary from './ErrorBoundary'

// Default loading component
const DefaultLoader: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      gap: 2
    }}
  >
    <CircularProgress />
    <Typography variant="body2" color="textSecondary">
      Loading component...
    </Typography>
  </Box>
)

// Skeleton loader component
const SkeletonLoader: React.FC<{
  variant?: 'text' | 'rectangular' | 'circular'
  width?: number | string
  height?: number | string
  rows?: number
}> = (props = {}) => {
  const {
    variant = 'rectangular',
    width = '100%',
    height = 200,
    rows = 3
  } = props

  return (
    <Box sx={{ p: 2 }}>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          width={width}
          height={height}
          sx={{ mb: 1 }}
        />
      ))}
    </Box>
  )
}

/**
 * Simple lazy loading wrapper
 */
export function createLazyComponent(
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  fallback: React.ReactNode = <DefaultLoader />
) {
  const LazyComponent = lazy(importFunc)
  
  return React.forwardRef<any, any>((props, ref) => (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  ))
}

/**
 * Hook for intersection-based lazy loading
 */
export function useIntersectionLazyLoad(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsIntersecting(true)
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isLoaded, options])

  return {
    ref: elementRef,
    isIntersecting,
    isLoaded
  }
}

/**
 * Component for viewport-based lazy loading
 */
interface ViewportLazyLoadProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  threshold?: number
  rootMargin?: string
}

export const ViewportLazyLoad: React.FC<ViewportLazyLoadProps> = ({
  children,
  placeholder = <SkeletonLoader />,
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const { ref, isIntersecting } = useIntersectionLazyLoad({
    threshold,
    rootMargin
  })

  return (
    <div ref={ref}>
      {isIntersecting ? children : placeholder}
    </div>
  )
}

// Example usage components
export const LazyUserManagement = createLazyComponent(
  () => import('./UserManagement'),
  <SkeletonLoader rows={5} height={60} />
)

export default {
  createLazyComponent,
  useIntersectionLazyLoad,
  ViewportLazyLoad,
  DefaultLoader,
  SkeletonLoader
}
