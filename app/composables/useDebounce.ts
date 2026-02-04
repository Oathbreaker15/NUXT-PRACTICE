import { onBeforeUnmount } from 'vue'

export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const resetTimeout = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  const debounce = (...args: Args) => {
    resetTimeout()

    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  onBeforeUnmount(() => resetTimeout)

  return debounce
}