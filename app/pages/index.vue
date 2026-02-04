<script setup lang="ts">
import { FilterPageStore } from '~/store/FilterPage'
import { storeToRefs } from 'pinia'

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

const handleInput = useDebounce(searchByQuery, 800)
</script>

<template>
  <div class="products">
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

    <div v-if="isFetchingProducts">
      <SkeletonProductSearchAndSortPanel />

      <div class="products__grid">
        <template v-for="key in actualLimit" :key="key">
          <SkeletonProduct />
        </template>
      </div>

      <SkeletonProductShowOnPage />

      <SkeletonProductMoreBtn />
    </div>

    <template v-else>
      <div v-if="productsPrepared.length">
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
      </div>

      <ProductNothingFound v-else @reset-filters="clearFiltersAndSearchQuery" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.products {
  display: grid;
  grid-template-columns: 304px auto;
  gap: 24px;

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
    grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
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
}
</style>
