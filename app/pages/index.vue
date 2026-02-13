<script setup lang="ts">
import { FilterPageStore } from '~/store/FilterPage'
import { storeToRefs } from 'pinia'
import { useDeviceType } from '~/composables/useDeviceType'

useHead({
  title: 'Products',
  meta: [{ name: 'description', content: 'Products from dummyapi' }, { charset: 'utf-8' }]
})

const store = FilterPageStore()
const {
  FILTER_ITEMS_AMOUNT,
  sortProducts,
  sortObj,
  fetchProducts,
  LIMITS_ARR,
  toggleFilterObj,
  togglePanelItemsOpenedState,
  togglePanelItemsOpenedStateItem,
  clearFilterObj,
  searchByQuery,
  clearSearchInProductsQuery,
  clearFiltersAndSearchQuery,
  setActualLimit
} = store
const {
  filters,
  productsPrepared,
  actualLimit,
  searchInProductsQuery,
  totalRemains,
  isFetchingProducts,
  isFetchingFilters
} = storeToRefs(store)

const { isDesktop, isTablet, isMobile } = useDeviceType()

const handleInput = useDebounce(searchByQuery, 800)
</script>

<template>
  <div class="products">
    <div v-if="isDesktop" class="products__filter-panel">
      <SkeletonFilterPanel
        v-if="isFetchingFilters"
        key="skeleton"
        :filter-items-amount="FILTER_ITEMS_AMOUNT"
      />

      <FilterPanel
        v-else
        key="content"
        :filters="filters"
        @select-filter-value="toggleFilterObj"
        @toggle-panel-view="togglePanelItemsOpenedState"
        @toggle-panel-item-view="togglePanelItemsOpenedStateItem"
        @reset-filters="clearFilterObj"
      />
    </div>

    <div class="products__content">
      <FilterDeviceBar v-if="isTablet">
        <template #left-item>
          <FilterDeviceBarBtn icon="filter" text="Filters">
            <template #default="{ close }">
              <FilterPanel
                key="content"
                :filters="filters"
                :close-on-device="close"
                @select-filter-value="toggleFilterObj"
                @toggle-panel-view="togglePanelItemsOpenedState"
                @toggle-panel-item-view="togglePanelItemsOpenedStateItem"
                @reset-filters="clearFilterObj"
              />
            </template>
          </FilterDeviceBarBtn>
        </template>
        <template #right-item>
          <FilterDeviceBarBtn icon="sort" text="Sort" />
        </template>
      </FilterDeviceBar>

      <SkeletonProductGridWithSortPanel
        v-if="isFetchingProducts && !productsPrepared.length"
        :actual-limit="actualLimit"
      />

      <div v-else class="products__content-inner">
        <template v-if="productsPrepared.length">
          <div class="products__search-and-sort-panel">
            <BaseInput
              name="filter-products"
              label-text="Search in result"
              placeholder="Min 3 characters"
              :value="searchInProductsQuery"
              @input="handleInput"
              @reset="clearSearchInProductsQuery"
            />

            <BaseSelect
              name="sort-products"
              label-text="Sort by:"
              :options="sortObj"
              @select="sortProducts"
            />
          </div>

          <div class="products__grid">
            <template v-for="product in productsPrepared" :key="product.id">
              <Product :product="product" :search-query="searchInProductsQuery" />
            </template>
          </div>

          <div class="products__show-on-page-select">
            <BaseSelect
              name="show-on-page"
              label-text="Show on page:"
              :options="LIMITS_ARR"
              @select="setActualLimit"
            />
          </div>

          <button
            v-if="totalRemains > 0"
            type="submit"
            :disabled="isFetchingProducts"
            :class="['products__get-more-btn', { loader: isFetchingProducts }]"
            @click="fetchProducts"
          >
            Show more {{ totalRemains }} products
          </button>
        </template>

        <ProductNothingFound v-else @reset-filters="clearFiltersAndSearchQuery" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products {
  display: grid;
  grid-template-columns: 304px auto;
  gap: 24px;
  max-width: 1344px;
  margin: 0 auto;
  width: 100%;

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
    margin-bottom: var(--margin-bottom-16);
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
    margin-top: var(--margin-top-16);
    cursor: pointer;

    @media (hover: hover) {
      @include hover-active-opacity(0.6);
    }

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

  @media (max-width: 1095px) {
    grid-auto-rows: 1fr;
    grid-template-columns: auto;

    .products__filter-panel {
      transform: translateX(-304px);
      max-width: 304px;
      position: absolute;
    }
  }
}
</style>
