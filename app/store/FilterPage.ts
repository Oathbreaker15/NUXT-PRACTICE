import { defineStore } from 'pinia'
import { computed } from 'vue'

export const FilterPageStore = defineStore('FilterPageStore', () => {
  const route = useRoute()
  const FILTER_ITEMS_AMOUNT = 7
  const products = ref<ProductType[]>([])
  const filters = ref<ProductsFiltersAPIResponse>({})
  const filterObj = ref<ProductsFiltersAPIResponse>({})
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
  const currentSortItem = ref<SortType | undefined>(undefined)

  const searchInProductsQuery = ref('')

  const panelItemsOpenedState = ref<Record<string, boolean>>({})
  const isFetchingProducts = ref(true)
  const isFetchingFilters = ref(true)
  const queryObj = reactive({
    limit: actualLimit,
    skip: 0,
    total: 0
  })

  const loadProducts = async () => {
    products.value = []
    queryObj.skip = 0

    const searchQuery = route.query.q as string

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
      isFetchingProducts.value = true
      const dataProducts = await $fetch<ProductsAPIResponse>(`/api/ProductsSearch`, {
        query: { q }
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
    if (!filterObj.value[category]) {
      filterObj.value[category] = [filterParam]
    } else {
      if (filterObj.value[category].includes(filterParam)) {
        filterObj.value[category] = filterObj.value[category].filter(
          (filter) => filter !== filterParam
        )

        if (!filterObj.value[category].length) {
          delete filterObj.value[category]
        }
      } else {
        filterObj.value[category] = [...filterObj.value[category], filterParam]
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

    currentSortItem.value = category
    products.value = result
  }

  const searchByQuery = (query: string) => {
    searchInProductsQuery.value = query
  }

  const setActualLimit = async (limit: (typeof LIMITS_ARR)[number]) => {
    actualLimit.value = limit
  }

  const clearFilterObj = () => {
    filterObj.value = {}
  }

  const clearSearchInProductsQuery = () => {
    searchInProductsQuery.value = ''
  }

  const clearFiltersAndSearchQuery = () => {
    clearFilterObj()
    clearSearchInProductsQuery()
  }

  const filteredProducts = computed(() => {
    const keys = Object.keys(filterObj.value) as Array<keyof ProductsFiltersAPIResponse>

    return products.value.filter((product) => {
      return keys.every((key) => {
        if (Array.isArray(product[key])) {
          return product[key]?.some((filterValue) => {
            return filterObj.value[key]?.includes(filterValue)
          })
        } else {
          if (typeof product[key] === 'string' && filterObj.value[key]?.includes(product[key])) {
            return true
          }
        }
      })
    })
  })

  const searchedByQueryProducts = computed(() => {
    const query = searchInProductsQuery.value.toLowerCase().trim()
    if (!query || query.length < 3) return filteredProducts.value

    return filteredProducts.value.filter(
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
  const isResetBtnDisabled = computed(() => !Object.keys(filterObj.value).length)
  const totalRemains = computed(() => queryObj.total - queryObj.skip)

  const initData = async () => {
    await fetchFilters()
    await loadProducts()
  }

  // initData()

  return {
    FILTER_ITEMS_AMOUNT,
    filters,
    filterObj,
    initData,
    sortArr,
    LIMITS_ARR,
    isFetchingProducts,
    isFetchingFilters,
    searchInProductsQuery,
    actualLimit,
    currentSortItem,

    fetchProductsAll,
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
