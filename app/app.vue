<script setup lang="ts">
  const { data: products, status, error, refresh } = await useFetch('https://dummyjson.com/products')
</script>

<template>
  <div>
    <h1>hello world</h1>

    <div class="grid">
      <article class="product" v-for="product in products.products" :key="product.id">
        <NuxtImg class="product__image" :src="product.images[0]" :alt="product.description" />
        
        <h2 class="product__title">{{ product.title }}</h2>
        <p class="product__description">{{ product.description }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .grid {
    display: grid;
    grid-auto-rows: 1fr;
    column-gap: 24px;
    row-gap: 20px;
    width: 100%;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill,minmax(288px,1fr));
  }

  .product {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 12px;
    border: 2px solid grey;
    padding: 16px;

    &__image {
      width: 100%;
      max-height: 200px;
      margin-bottom: auto;
    }
  }
</style>
