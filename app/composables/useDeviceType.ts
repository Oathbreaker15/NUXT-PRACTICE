import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDebounce } from './useDebounce'

export interface IDeviceTypeOptions {
  desktopBreakpoint?: number
  tabletBreakpoint?: number
  debounceTime?: number
}

export function useDeviceType(options: IDeviceTypeOptions = {}) {
  const { desktopBreakpoint = 1096, tabletBreakpoint = 640, debounceTime = 100 } = options

  const isDesktop = ref(import.meta.client ? window.innerWidth >= desktopBreakpoint : false)
  const isTablet = ref(import.meta.client ? window.innerWidth < desktopBreakpoint && window.innerWidth >= tabletBreakpoint : false)
  const isMobile = ref(import.meta.client ? window.innerWidth < tabletBreakpoint : false)

  onMounted(() => window.addEventListener('resize', handleResize))
  onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
  // const isTablet = ref(
  //   window.innerWidth < desktopBreakpoint && window.innerWidth >= tabletBreakpoint
  // )
  // const isMobile = ref(window.innerWidth < tabletBreakpoint)

  const handleDeviceType = useDebounce(() => {
    isDesktop.value = window.innerWidth >= desktopBreakpoint
    isTablet.value = window.innerWidth < desktopBreakpoint && window.innerWidth >= tabletBreakpoint
    isMobile.value = window.innerWidth < tabletBreakpoint
  }, debounceTime)

  onMounted(() => {
    window.addEventListener('resize', handleDeviceType)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleDeviceType)
  })

  return {
    isDesktop,
    isTablet,
    isMobile
  }
}