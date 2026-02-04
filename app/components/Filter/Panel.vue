<script setup lang="ts">
import { FilterPageStore } from '~/store/FilterPage'
import type { ProductsFiltersAPIResponse } from '~~/shared/types/Product/API/ProductsFiltersAPIResponse'

const emit = defineEmits<{
  (e: 'reset-filters'): void
  (e: 'select-filter-value', category: keyof ProductsFiltersAPIResponse, filterParam: string): void
  (e: 'toggle-panel-item-view', category: keyof ProductsFiltersAPIResponse): void
  (e: 'toggle-panel-view'): void
}>()

const store = FilterPageStore()
const { isResetBtnDisabled, filterObj, panelItemsOpenedState, isPanelAllOpened } =
  storeToRefs(store)
const props = defineProps<{ filters: ProductsFiltersAPIResponse }>()
</script>

<template>
  <aside class="filter">
    <div class="filter__title-wrapper">
      <h2 class="filter__title">Filters</h2>

      <span class="filter__title-toggle" @click="emit('toggle-panel-view')">{{
        isPanelAllOpened ? 'Collapse all' : 'Expand all'
      }}</span>
    </div>

    <form class="filter__form">
      <template v-for="(filter, key) in props.filters" :key="key">
        <FilterItem
          v-if="Array.isArray(filter) && filter.length"
          :filter="filter"
          :name="key"
          :filter-obj="filterObj"
          :is-panel-opened="!!panelItemsOpenedState[key]"
          class="filter__content"
          @select-filter-value="(category, value) => emit('select-filter-value', category, value)"
          @toggle-panel-item-view="(category) => emit('toggle-panel-item-view', category)"
        />
      </template>

      <button
        type="reset"
        class="filter__reset-btn"
        :disabled="isResetBtnDisabled"
        @click="emit('reset-filters')"
      >
        Reset filters
      </button>
    </form>
  </aside>
</template>

<style lang="scss" scoped>
.filter {
  .filter__title-wrapper {
    color: var(--white);
    background-color: var(--black-light);
    padding: 12px;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .filter__title-toggle {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .filter__content {
    padding: 12px;
    &:not(:last-child) {
      border-bottom: 2px solid var(--grey-ultralight-opaque);
    }
  }

  .filter__reset-btn {
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    border: none;
    background: var(--grey-light-opaque);
    font-weight: 700;
    text-transform: uppercase;

    &:not(:disabled) {
      cursor: pointer;
      @include hover-active-opacity(0.6);
    }
  }
}
</style>
