/**
 * Simplified test suite for custom hooks
 * Demonstrates: Hook testing, mocking, TypeScript testing
 */
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'
import { usePerformance } from '../usePerformance'

describe('Custom Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useDebounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 500))
      expect(result.current).toBe('initial')
    })

    it('should debounce value changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 }
        }
      )

      expect(result.current).toBe('initial')

      // Update the value
      rerender({ value: 'updated', delay: 500 })

      // Value should not change immediately
      expect(result.current).toBe('initial')

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(500)
      })

      // Now it should be updated
      expect(result.current).toBe('updated')
    })
  })

  describe('usePerformance', () => {
    beforeEach(() => {
      jest.spyOn(performance, 'now')
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150)
      
      jest.spyOn(console, 'group').mockImplementation(() => {})
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should provide performance measurement functions', () => {
      const { result } = renderHook(() => 
        usePerformance('TestComponent', { enabled: true })
      )

      expect(typeof result.current.startMeasure).toBe('function')
      expect(typeof result.current.endMeasure).toBe('function')
      expect(typeof result.current.getMetrics).toBe('function')
      expect(typeof result.current.resetMetrics).toBe('function')
    })
  })
})
