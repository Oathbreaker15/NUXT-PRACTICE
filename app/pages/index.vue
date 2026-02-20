<script setup lang="ts">
const query = ref('')

const handleSubmit = async (query: string) => {
  await navigateTo({
    path: '/products',
    query: { q: query }
  })
}
</script>

<template>
  <main class="main-page">
    <div class="main-page__logo"></div>
    <BaseInput
      v-model="query"
      name="search"
      placeholder="Title, brand or category"
      btn-text="Search"
      :width="640"
      :height="40"
      class="main-page__search"
      @submit="handleSubmit"
    />

    <nuxt-link :to="{ path: '/products' }" class="main-page__all-products-link">
      See all products
    </nuxt-link>
  </main>
</template>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .main-page__logo {
    background: url('~/assets/svg/logo.svg') no-repeat 0 0;
    background-size: cover;
    width: 640px;
    height: 260px;
  }

  .main-page__search {
    width: 640px;
    height: 40px;
  }

  .main-page__all-products-link {
    text-decoration: none;
    color: var(--link);
    margin-top: 8px;

    @include hover-active-brand-text-color();
  }
}
</style>
