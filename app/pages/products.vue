<script setup lang="ts">
import { FilterPageStore } from '~/store/useFilterPageStore'
import { storeToRefs } from 'pinia'
import { useDeviceType } from '~/composables/useDeviceType'

useHead({
  title: 'Products',
  meta: [{ name: 'description', content: 'Products from dummyapi' }, { charset: 'utf-8' }]
})

const store = FilterPageStore()
const {
  skeletonCount,
  sortProducts,
  sortArr,
  loadProducts,
  LIMITS_ARR,
  toggleFilterObj,
  togglePanelItemsOpenedState,
  togglePanelItemsOpenedStateItem,
  clearFilterObj,
  searchByQuery,
  clearSearchInProductsQuery,
  clearFiltersAndSearchQuery,
  setActualLimit,
  initData
} = store
const {
  filters,
  productsPrepared,
  actualLimit,
  searchQuery,
  currentSortType,
  searchInProductsQuery,
  totalRemains,
  isFetchingProducts,
  activeFilters,
  panelItemsOpenedState,
  isFetchingFilters,
  isPaginationHiddenForSearchResults
} = storeToRefs(store)

const { isDesktop, isMobile } = useDeviceType()

const smallestLimit = LIMITS_ARR[0].key

watch(searchInProductsQuery, () => useDebounce(searchByQuery, 800))

onMounted(() => {
  initData()
})
</script>

<template>
  <h1 v-if="!!searchQuery" class="search-result-header">
    Search results for <span class="search-result-header__query">{{ searchQuery }}</span>
  </h1>

  <div class="back-to-main-page-link__wrapper">
    <nuxt-link :to="{ path: '/' }" class="back-to-main-page-link">back</nuxt-link>
  </div>

  <div class="products">
    <div class="products__filter-panel">
      <template v-if="isDesktop">
        <SkeletonFilterPanel v-if="isFetchingFilters" :filter-items-amount="skeletonCount" />

        <FilterPanel
          v-else
          header="Filters"
          :is-toggleble="true"
          :is-resetable="true"
          @select-filter-value="toggleFilterObj"
          @toggle-panel-view="togglePanelItemsOpenedState"
          @toggle-panel-item-view="togglePanelItemsOpenedStateItem"
          @reset-filters="clearFilterObj"
        >
          <template v-for="(filter, key) in filters" :key="key">
            <FilterItemFilter
              v-if="Array.isArray(filter) && filter.length"
              :filter="filter"
              :name="key"
              :active-filters="activeFilters"
              :is-panel-opened="!!panelItemsOpenedState[key]"
              class="filter__content"
              @select-filter-value="toggleFilterObj"
              @toggle-panel-item-view="togglePanelItemsOpenedStateItem"
            />
          </template>
        </FilterPanel>
      </template>
    </div>

    <div class="products__content">
      <template v-if="!isDesktop">
        <SkeletonFilterPanelDevice v-if="isFetchingFilters" />

        <FilterDeviceBar v-else>
          <template #left-item>
            <FilterDeviceBarBtn icon="filter" text="Filters">
              <template #default="{ close }">
                <FilterPanel
                  class="filter__content"
                  header="Filters"
                  :is-toggleble="true"
                  :is-resetable="true"
                  :filters="filters"
                  :close-on-device="close"
                  @toggle-panel-view="togglePanelItemsOpenedState"
                  @reset-filters="clearFilterObj"
                >
                  <template v-for="(filter, key) in filters" :key="key">
                    <FilterItemFilter
                      v-if="Array.isArray(filter) && filter.length"
                      :filter="filter"
                      :name="key"
                      :active-filters="activeFilters"
                      :is-panel-opened="!!panelItemsOpenedState[key]"
                      class="filter__content"
                      @select-filter-value="toggleFilterObj"
                      @toggle-panel-item-view="togglePanelItemsOpenedStateItem"
                    />
                  </template>
                </FilterPanel>
              </template>
            </FilterDeviceBarBtn>
          </template>

          <template v-if="isMobile" #right-item>
            <FilterDeviceBarBtn icon="sort" text="Sort">
              <template #default="{ close }">
                <FilterPanel
                  class="filter__content"
                  header="Sort by:"
                  :is-toggleble="false"
                  :is-resetable="false"
                  :filters="filters"
                  :close-on-device="close"
                  @toggle-panel-view="togglePanelItemsOpenedState"
                  @reset-filters="clearFilterObj"
                >
                  <template v-for="(sortItem, i) in sortArr" :key="i">
                    <SortItem
                      :option="sortItem"
                      :model-value="currentSortType"
                      class="filter__content"
                      @select="sortProducts"
                    />
                  </template>
                </FilterPanel>
              </template>
            </FilterDeviceBarBtn>
          </template>
        </FilterDeviceBar>
      </template>

      <SkeletonProductGridWithSortPanel
        v-if="isFetchingProducts && !productsPrepared.length"
        :actual-limit="actualLimit"
      />

      <div v-else class="products__content-inner">
        <template v-if="productsPrepared.length">
          <div class="products__search-and-sort-panel">
            <BaseInput
              v-model="searchInProductsQuery"
              name="filter-products"
              label-text="Search in result"
              placeholder="Min 3 characters"
              :width="208"
              :height="30"
              @reset="clearSearchInProductsQuery"
            />

            <BaseSelect
              v-if="!isMobile"
              name="sort-products"
              label-text="Sort by:"
              :model-value="currentSortType"
            >
              <template #default="{ select }">
                <SortItem
                  v-for="(sortItem, i) in sortArr"
                  :key="i"
                  :option="sortItem"
                  :model-value="currentSortType"
                  :select="select"
                  @select="sortProducts"
                />
              </template>
            </BaseSelect>
          </div>

          <div
            :class="[
              'products__grid',
              { 'products__grid--no-margin': productsPrepared.length < smallestLimit }
            ]"
          >
            <template v-for="product in productsPrepared" :key="product.id">
              <Product :product="product" :search-query="searchInProductsQuery" />
            </template>
          </div>

          <div class="products__show-on-page-select">
            <BaseSelect
              v-if="productsPrepared.length >= smallestLimit"
              name="show-on-page"
              label-text="Show on page:"
              :model-value="actualLimit"
            >
              <template #default="{ select }">
                <SortItem
                  v-for="(limit, i) in LIMITS_ARR"
                  :key="i"
                  :option="limit"
                  :model-value="actualLimit"
                  :select="select"
                  @select="setActualLimit"
                />
              </template>
            </BaseSelect>
          </div>

          <button
            v-if="totalRemains > 0 && !isPaginationHiddenForSearchResults"
            type="submit"
            :disabled="isFetchingProducts"
            :class="['products__get-more-btn', { loader: isFetchingProducts }]"
            @click="loadProducts(false)"
          >
            Show more {{ totalRemains }} products
          </button>
        </template>

        <template v-else>
          <div class="products__search-and-sort-panel">
            <BaseInput
              v-model="searchInProductsQuery"
              name="filter-products"
              label-text="Search in result"
              placeholder="Min 3 characters"
              :width="208"
              :height="30"
              @reset="clearSearchInProductsQuery"
            />
          </div>

          <ProductNothingFound @reset-filters="clearFiltersAndSearchQuery" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-result-header {
  margin-bottom: var(--space-16);

  .search-result-header__query {
    color: var(--brand);
  }
}

.products {
  display: grid;
  grid-template-columns: 304px auto;
  gap: 24px;

  .products__filter-panel {
    background: var(--grey-light-opaque);
    border-radius: 4px;
  }

  .products__search-and-sort-panel {
    margin-bottom: 8px;
  }

  .products__grid {
    display: grid;
    grid-auto-rows: max-content;
    column-gap: 24px;
    row-gap: 20px;
    width: 100%;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill, minmax(226px, 1fr));
    margin-bottom: var(--space-16);

    &.products__grid--no-margin {
      margin: 0;
    }
  }

  .products__get-more-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    border: 2px solid #dddddd;
    background: var(--white);
    padding: 8px 4px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 20px;
    margin-top: var(--space-16);
    cursor: pointer;

    @include hover-active-opacity(0.6);

    &.loader::after {
      content: '';
      display: block;
      width: 24px;
      padding: 4px;
      margin-left: 8px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--black);
      --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
      -webkit-mask: var(--_m);
      mask: var(--_m);
      -webkit-mask-composite: source-out;
      mask-composite: subtract;
      animation: l3 1s infinite linear;
    }

    @keyframes l3 {
      to {
        transform: rotate(1turn);
      }
    }
  }

  .products__show-on-page-select {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .products__search-and-sort-panel {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: $tablet-breakpoint) {
    grid-auto-rows: 1fr;
    grid-template-columns: auto;

    .products__filter-panel {
      transform: translateX(-304px);
      max-width: 304px;
      position: absolute;
    }
  }
}

.back-to-main-page-link__wrapper {
  margin: 8px 0;

  .back-to-main-page-link {
    color: var(--link);
    text-decoration: none;

    @include hover-active-brand-text-color();
  }
}
</style>
