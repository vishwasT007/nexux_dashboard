/**
 * Performance monitoring hook for measuring component render times
 * Demonstrates: Performance API, useRef, useCallback, development tools
 */
import { useRef, useCallback, useEffect } from 'react'

interface PerformanceMetrics {
  renderTime: number
  mountTime: number
  updateCount: number
}

interface UsePerformanceOptions {
  enabled?: boolean
  logToConsole?: boolean
  threshold?: number // Log only if render time exceeds threshold (ms)
}

export function usePerformance(
  componentName: string,
  options: UsePerformanceOptions = {}
) {
  const {
    enabled = process.env.NODE_ENV === 'development',
    logToConsole = true,
    threshold = 16 // 16ms = 60fps threshold
  } = options

  const renderStartRef = useRef<number>(0)
  const mountTimeRef = useRef<number>(0)
  const updateCountRef = useRef<number>(0)
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0
  })

  // Start measuring render time
  const startMeasure = useCallback(() => {
    if (!enabled) return
    renderStartRef.current = performance.now()
  }, [enabled])

  // End measuring render time
  const endMeasure = useCallback(() => {
    if (!enabled || renderStartRef.current === 0) return

    const renderTime = performance.now() - renderStartRef.current
    metricsRef.current.renderTime = renderTime
    updateCountRef.current += 1
    metricsRef.current.updateCount = updateCountRef.current

    if (logToConsole && renderTime > threshold) {
      console.group(`🐌 Slow Render: ${componentName}`)
      console.log(`Render time: ${renderTime.toFixed(2)}ms`)
      console.log(`Update count: ${updateCountRef.current}`)
      console.log(`Mount time: ${metricsRef.current.mountTime.toFixed(2)}ms`)
      console.groupEnd()
    }

    renderStartRef.current = 0
  }, [enabled, componentName, logToConsole, threshold])

  // Measure mount time
  useEffect(() => {
    if (!enabled) return

    const mountStart = performance.now()
    
    return () => {
      const mountTime = performance.now() - mountStart
      metricsRef.current.mountTime = mountTime
      
      if (logToConsole) {
        console.log(`⚡ ${componentName} mounted in ${mountTime.toFixed(2)}ms`)
      }
    }
  }, [enabled, componentName, logToConsole])

  // Get current metrics
  const getMetrics = useCallback((): PerformanceMetrics => {
    return { ...metricsRef.current }
  }, [])

  // Reset metrics
  const resetMetrics = useCallback(() => {
    updateCountRef.current = 0
    metricsRef.current = {
      renderTime: 0,
      mountTime: 0,
      updateCount: 0
    }
  }, [])

  return {
    startMeasure,
    endMeasure,
    getMetrics,
    resetMetrics
  }
}
