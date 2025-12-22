<script setup lang="ts">
  import { props } from 'vue';
</script>

<template>
  <article class="product" v-for="product in products.products" :key="product.id">
    <NuxtImg class="product__image" :src="product.images[0]" :alt="product.description" />
    
    <h2 class="product__title">{{ product.title }}</h2>
    <p class="product__description">{{ product.description }}</p>
  </article>
</template>

<style></style>