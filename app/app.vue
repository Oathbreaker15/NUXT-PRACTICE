<script setup lang="ts">
useHead({
  title: 'Products',
  meta: [{ name: 'description', content: 'Products from dummyapi' }, { charset: 'utf-8' }],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    }
  ]
})

const { data: dataProducts } = await useFetch<ProductsAPIResponse>('/api/ProductsFetch')
const { data: dataProductsFilters } =
  await useFetch<ProductsFiltersAPIResponse>('/api/ProductsFilters')
const products = reactive(dataProducts.value?.products || [])
const filters = dataProductsFilters.value || []
</script>

<template>
  <div class="products">
    <FilterPanel :filters="filters" />

    <div class="grid">
      <template v-for="product in products" :key="product.id">
        <Product :product="product" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products {
  display: grid;
  grid-template-columns: 304px auto;
  gap: 24px;
}

.grid {
  display: grid;
  grid-auto-rows: 1fr;
  column-gap: 24px;
  row-gap: 20px;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
}
</style>
