<script setup lang="ts">
const query = ref('')

const searchByQuery = async (query: string) => {
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
      size="lg"
      class="main-page__search"
      @submit="searchByQuery"
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
    background-position: center;
    width: 640px;
    height: 260px;
  }

  .main-page__search {
    width: 100%;
    height: 100%;
    max-width: 640px;
    max-height: 48px;
  }

  .main-page__all-products-link {
    text-decoration: none;
    color: var(--link);
    margin-top: 8px;

    @include hover-active-brand-text-color();
  }

  @media (max-width: $tablet-breakpoint) {
    padding: 0 16px;
  }

  @media (max-width: $mobile-breakpoint) {
    .main-page__logo {
      width: 320px;
      height: 128px;
    }
  }
}
</style>
