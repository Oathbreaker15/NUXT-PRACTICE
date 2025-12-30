<script setup lang="ts">
import type { ProductsFiltersAPIResponse } from '~~/shared/types/ProductsFiltersAPIResponse'
import Item from './Item.vue'
const props = defineProps<{ filters: ProductsFiltersAPIResponse }>()
</script>

<template>
  <section class="filter">
    <h2 class="filter__title">Filters</h2>

    <template v-for="(filter, key) in props.filters" :key="key">
      <Item :filter="filter" :name="key" class="filter__content"/>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.filter {
  .filter__title {
    color: var(--white);
    background-color: var(--black-light);
    padding: 12px;
    border-radius: 8px 8px 0 0;
  }

  .filter__content {
    padding: 12px;
      &:not(:last-child) {
        border-bottom: 2px solid var(--grey-ultralight-opaque);
      }
  }
}
</style>
