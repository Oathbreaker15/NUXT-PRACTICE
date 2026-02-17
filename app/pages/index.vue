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
  sortArr,
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
  currentSortItem,
  searchInProductsQuery,
  totalRemains,
  isFetchingProducts,
  filterObj,
  panelItemsOpenedState,
  isFetchingFilters
} = storeToRefs(store)

const { isDesktop, isTablet, isMobile } = useDeviceType()

const handleInput = useDebounce(searchByQuery, 800)
</script>

<template>
  <div class="products">
    <div v-if="isDesktop" class="products__filter-panel">
      <SkeletonFilterPanel v-if="isFetchingFilters" :filter-items-amount="FILTER_ITEMS_AMOUNT" />

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
            :filter-obj="filterObj"
            :is-panel-opened="!!panelItemsOpenedState[key]"
            class="filter__content"
            @select-filter-value="toggleFilterObj"
            @toggle-panel-item-view="togglePanelItemsOpenedStateItem"
          />
        </template>
      </FilterPanel>
    </div>

    <div class="products__content">
      <FilterDeviceBar v-if="isTablet || isMobile">
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
                    :filter-obj="filterObj"
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
                    :model-value="currentSortItem"
                    class="filter__content"
                    @select="sortProducts"
                  />
                </template>
              </FilterPanel>
            </template>
          </FilterDeviceBarBtn>
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
              v-if="!isMobile"
              name="sort-products"
              label-text="Sort by:"
              :model-value="currentSortItem"
            >
              <template #default="{ select }">
                <SortItem
                  v-for="(sortItem, i) in sortArr"
                  :key="i"
                  :option="sortItem"
                  :model-value="currentSortItem"
                  :select="select"
                  @select="sortProducts"
                />
              </template>
            </BaseSelect>
          </div>

          <div class="products__grid">
            <template v-for="product in productsPrepared" :key="product.id">
              <Product :product="product" :search-query="searchInProductsQuery" />
            </template>
          </div>

          <div class="products__show-on-page-select">
            <BaseSelect name="show-on-page" label-text="Show on page:" :model-value="actualLimit">
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
            v-if="totalRemains > 0"
            type="submit"
            :disabled="isFetchingProducts"
            :class="['products__get-more-btn', { loader: isFetchingProducts }]"
            @click="fetchProducts"
          >
            Show more {{ totalRemains }} products
          </button>
        </template>

        <template v-else>
          <div class="products__search-and-sort-panel">
            <BaseInput
              name="filter-products"
              label-text="Search in result"
              placeholder="Min 3 characters"
              :value="searchInProductsQuery"
              @input="handleInput"
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

    .products__content-inner {
      padding: 0 16px;
    }

    .products__filter-panel {
      transform: translateX(-304px);
      max-width: 304px;
      position: absolute;
    }
  }

  @media (max-width: 639px) {
    .products__content-inner {
      padding: 0 16px;
    }
  }
}
</style>
