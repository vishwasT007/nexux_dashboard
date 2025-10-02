/**
 * Custom hook for API calls with loading, error, and caching states
 * Demonstrates advanced patterns: generics, error handling, caching, cleanup
 */
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseApiOptions {
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  cacheTime?: number
}

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
  cancel: () => void
}

export function useApi<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const abortControllerRef = useRef<AbortController | null>(null)
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map())
  
  const {
    enabled = true,
    refetchOnWindowFocus = false,
    cacheTime = 5 * 60 * 1000 // 5 minutes
  } = options

  const fetchData = useCallback(async () => {
    if (!enabled) return

    // Check cache first
    const cached = cacheRef.current.get(url)
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setData(cached.data)
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      // Cache the result
      cacheRef.current.set(url, {
        data: result,
        timestamp: Date.now()
      })
      
      setData(result)
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, [url, enabled, cacheTime])

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Window focus refetch
  useEffect(() => {
    if (!refetchOnWindowFocus) return

    const handleFocus = () => fetchData()
    window.addEventListener('focus', handleFocus)
    
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchData, refetchOnWindowFocus])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    cancel
  }
}
