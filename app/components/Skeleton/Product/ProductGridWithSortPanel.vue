<script setup lang="ts">
interface IProps {
  actualLimit: {key: number}
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="products__products-skeleton">
    <SkeletonProductSearchAndSortPanel />

    <div class="products__grid">
      <template v-for="cnt in actualLimit.key" :key="cnt">
        <SkeletonProduct />
      </template>
    </div>

    <SkeletonProductShowOnPage />

    <SkeletonProductMoreBtn />
  </div>
</template>

<style scoped lang="scss">
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
</style>
