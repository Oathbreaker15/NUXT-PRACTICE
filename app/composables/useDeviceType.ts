// composables/useDeviceType.ts
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDebounce } from './useDebounce'

export interface IDeviceTypeOptions {
  desktopBreakpoint?: number
  tabletBreakpoint?: number
  debounceTime?: number
}

export function useDeviceType(options: IDeviceTypeOptions = {}) {
  const { 
    desktopBreakpoint = 1096, 
    tabletBreakpoint = 640, 
    debounceTime = 100 
  } = options

  const windowWidth = ref(0)

  const isMobile = computed(() => windowWidth.value > 0 && windowWidth.value < tabletBreakpoint)
  const isTablet = computed(() => windowWidth.value >= tabletBreakpoint && windowWidth.value < desktopBreakpoint)
  const isDesktop = computed(() => windowWidth.value >= desktopBreakpoint)

  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  const handleResize = useDebounce(updateWidth, debounceTime)

  onMounted(() => {
    updateWidth() 
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isDesktop,
    isTablet,
    isMobile
  }
}