import { defineStore } from 'pinia'
import { computed } from 'vue'

export const FilterPageStore = defineStore('filter-page', () => {
  const route = useRoute()
  const DEFAULT_SKELETON_COUNT = 7
  const products = ref<ProductType[]>([])
  const filters = ref<ProductsFiltersAPIResponse>({})
  const activeFilters = ref<ProductsFiltersAPIResponse>({})
  const sortArr = ref<SortType[]>([
    { key: 'title', order: 'asc' },
    { key: 'title', order: 'desc' },
    { key: 'price', order: 'asc' },
    { key: 'price', order: 'desc' },
    { key: 'rating', order: 'desc' },
    { key: 'rating', order: 'asc' }
  ])
  const LIMITS_ARR = [{ key: 8 }, { key: 16 }, { key: 32 }, { key: 64 }] as const
  const actualLimit = ref<LimitValue>({ key: 8 })
  const currentSortType = ref<SortType | undefined>(undefined)
  const searchQuery = ref('')
  const queryObj = reactive({
    limit: actualLimit,
    skip: 0,
    total: 0
  })

  const searchInProductsQuery = ref('')

  const panelItemsOpenedState = ref<Record<string, boolean>>({})
  const isFetchingProducts = ref(true)
  const isFetchingFilters = ref(true)

  const loadProducts = async (resetRequired = true) => {
    if (resetRequired) {
      products.value = []
      queryObj.skip = 0
    }

    const searchQuery = (route.query.q || '') as string

    if (searchQuery) {
      await fetchProductsSearch(searchQuery)
    } else {
      await fetchProductsAll()
    }
  }

  const fetchProductsAll = async () => {
    try {
      isFetchingProducts.value = true
      const dataProducts = await $fetch<ProductsAPIResponse>(`/api/ProductsFetchAll`, {
        query: {
          limit: queryObj.limit.key,
          skip: queryObj.skip
        }
      })
      if (dataProducts?.products) {
        products.value = [...products.value, ...dataProducts.products]
        queryObj.total = dataProducts.total
        queryObj.skip += +queryObj.limit.key
      }
    } catch (e) {
      console.log(e)
    } finally {
      isFetchingProducts.value = false
    }
  }

  const fetchProductsSearch = async (q: string) => {
    try {
      searchQuery.value = q
      isFetchingProducts.value = true
      const dataProducts = await $fetch<ProductsAPIResponse>(`/api/ProductsSearch`, {
        query: { q, limit: queryObj.limit.key, skip: queryObj.skip }
      })
      if (dataProducts?.products) {
        products.value = [...products.value, ...dataProducts.products]
        queryObj.total = dataProducts.total
        queryObj.skip += +queryObj.limit.key
      }
    } catch (e) {
      console.log(e)
    } finally {
      isFetchingProducts.value = false
    }
  }

  const fetchFilters = async () => {
    try {
      isFetchingFilters.value = true
      const dataProductsFilters = await $fetch<ProductsFiltersAPIResponse>('/api/ProductsFilters')
      filters.value = { ...dataProductsFilters }
      if (Object.keys(filters.value).length) {
        preparePanelItemsOpenedState()
      }
    } catch (e) {
      console.log(e)
    } finally {
      isFetchingFilters.value = false
    }
  }

  const preparePanelItemsOpenedState = () => {
    Object.keys(filters.value).forEach((key) => {
      panelItemsOpenedState.value[key] = true
    })
  }

  const togglePanelItemsOpenedStateItem = (category: keyof ProductsFiltersAPIResponse) => {
    panelItemsOpenedState.value[category] = !panelItemsOpenedState.value[category]
  }

  const togglePanelItemsOpenedState = () => {
    const isOpened = !isPanelAllOpened.value
    Object.keys(panelItemsOpenedState.value).forEach((key) => {
      panelItemsOpenedState.value[key] = isOpened
    })
  }

  const toggleFilterObj = (
    category: keyof ProductsFiltersAPIResponse,
    filterParam: string
  ): void => {
    if (!activeFilters.value[category]) {
      activeFilters.value[category] = [filterParam]
    } else {
      if (activeFilters.value[category].includes(filterParam)) {
        activeFilters.value[category] = activeFilters.value[category].filter(
          (filter) => filter !== filterParam
        )

        if (!activeFilters.value[category].length) {
          delete activeFilters.value[category]
        }
      } else {
        activeFilters.value[category] = [...activeFilters.value[category], filterParam]
      }
    }
  }

  const sortProducts = (category: SortType) => {
    const result = products.value.sort((a, b) => {
      if (category.order === 'asc') {
        if (typeof a[category.key] === 'string') {
          return String(a[category.key]).localeCompare(String(b[category.key]))
        }

        return +a[category.key] - +b[category.key]
      } else {
        if (typeof a[category.key] === 'string') {
          return String(b[category.key]).localeCompare(String(a[category.key]))
        }

        return +b[category.key] - +a[category.key]
      }
    })

    currentSortType.value = category
    products.value = result
  }

  const searchByQuery = (query: string) => {
    searchInProductsQuery.value = query
  }

  const setActualLimit = async (limit: (typeof LIMITS_ARR)[number]) => {
    actualLimit.value = limit
  }

  const clearFilterObj = () => {
    activeFilters.value = {}
  }

  const clearSearchInProductsQuery = () => {
    searchInProductsQuery.value = ''
  }

  const clearFiltersAndSearchQuery = () => {
    clearFilterObj()
    clearSearchInProductsQuery()
  }

  const filteredProducts = computed(() => {
    const keys = Object.keys(activeFilters.value) as Array<keyof ProductsFiltersAPIResponse>
    if (!keys.length) return products.value

    return products.value.filter((product) => {
      return keys.every((key) => {
        if (Array.isArray(product[key])) {
          return product[key]?.some((filterValue) => {
            return activeFilters.value[key]?.includes(filterValue)
          })
        } else {
          if (typeof product[key] === 'string' && activeFilters.value[key]?.includes(product[key])) {
            return true
          }
        }
      })
    })
  })

  const sortedProducts = computed(() => {
    const sortItem = currentSortType.value
    if (sortItem === undefined) return filteredProducts.value

    const arr = Array.from(filteredProducts.value)

    return arr.sort((a, b) => {
      if (sortItem.order === 'asc') {
        if (typeof a[sortItem.key] === 'string') {
          return String(a[sortItem.key]).localeCompare(String(b[sortItem.key]))
        }

        return +a[sortItem.key] - +b[sortItem.key]
      } else {
        if (typeof a[sortItem.key] === 'string') {
          return String(b[sortItem.key]).localeCompare(String(a[sortItem.key]))
        }

        return +b[sortItem.key] - +a[sortItem.key]
      }
    })
  })

  const searchedByQueryProducts = computed(() => {
    const query = searchInProductsQuery.value.toLowerCase().trim()
    if (!query || query.length < 3) return sortedProducts.value

    return sortedProducts.value.filter(
      (product) =>
        product.title.toLowerCase().includes(query) || product.brand?.toLowerCase().includes(query)
    )
  })

  const productsPrepared = computed(() =>
    searchedByQueryProducts.value.length ? searchedByQueryProducts.value : []
  )
  const isPanelAllOpened = computed(() =>
    Object.values(panelItemsOpenedState.value).every((item) => !!item)
  )
  const skeletonCount = computed(() => {
    if (Object.keys(filters.value).length) {
      return Object.keys(filters.value).length
    }
    return DEFAULT_SKELETON_COUNT
  })

  const isResetBtnDisabled = computed(() => !Object.keys(activeFilters.value).length)
  const totalRemains = computed(() => queryObj.total - queryObj.skip)

  const initData = async () => {
    await fetchFilters()
    await loadProducts()
  }

  return {
    skeletonCount,
    filters,
    activeFilters,
    initData,
    sortArr,
    LIMITS_ARR,
    isFetchingProducts,
    isFetchingFilters,
    searchInProductsQuery,
    actualLimit,
    currentSortType,
    searchQuery,

    loadProducts,
    panelItemsOpenedState,
    togglePanelItemsOpenedState,
    togglePanelItemsOpenedStateItem,
    searchByQuery,
    isPanelAllOpened,
    clearFilterObj,
    setActualLimit,
    toggleFilterObj,
    productsPrepared,
    filteredProducts,
    isResetBtnDisabled,
    sortProducts,
    totalRemains,
    clearSearchInProductsQuery,
    clearFiltersAndSearchQuery
  }
})
