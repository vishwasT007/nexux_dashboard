/**
 * Custom hook for local storage with TypeScript generics and error handling
 * Demonstrates: generics, serialization, error handling, synchronization
 */
import { useState, useEffect, useCallback } from 'react'

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isClient, setIsClient] = useState(false)

  // Effect to run only on client side
  useEffect(() => {
    setIsClient(true)
    
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        
        setStoredValue(valueToStore)
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          
          // Dispatch custom event to sync across components
          window.dispatchEvent(
            new CustomEvent('local-storage', {
              detail: { key, newValue: valueToStore }
            })
          )
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        window.dispatchEvent(
          new CustomEvent('local-storage', {
            detail: { key, newValue: null }
          })
        )
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Listen for changes to this localStorage key from other components
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.newValue ?? initialValue)
      }
    }

    window.addEventListener('local-storage', handleStorageChange as EventListener)
    
    return () => {
      window.removeEventListener('local-storage', handleStorageChange as EventListener)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
