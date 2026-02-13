<script setup lang="ts">
import { setBlockSize } from '@/composables/useSkeletonBlockSize'
</script>

<template>
  <div class="products__search-and-sort-panel">
    <div :style="setBlockSize(307, 30)" class="skeleton__block">
      <div :style="setBlockSize(120, 18)" class="skeleton__block-item"></div>

      <div :style="setBlockSize(207, 30)" class="skeleton__block-item"></div>
    </div>

    <div :style="setBlockSize(128, 30)" class="skeleton__block">
      <div :style="setBlockSize(60, 18)" class="skeleton__block-item"></div>

      <div :style="setBlockSize(60, 30)" class="skeleton__block-item"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton__block,
.products__search-and-sort-panel {
  display: flex;
  align-items: center;
}

.products__search-and-sort-panel {
  margin-bottom: var(--margin-bottom-8);
  justify-content: space-between;
}

.skeleton__block {
  justify-content: start;
  gap: 8px;

  .skeleton__block-item {
    @include skeleton-block();
  }
}
</style>
