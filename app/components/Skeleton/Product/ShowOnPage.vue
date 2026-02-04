<script setup lang="ts">
import { setBlockSize } from '@/composables/useSkeletonBlockSize'
</script>

<template>
  <div class="skeleton__block">
    <div :style="setBlockSize(113, 18)" class="skeleton__block-item"></div>

    <div :style="setBlockSize(40, 30)" class="skeleton__block-item"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton__block {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  margin-top: var(--margin-top-16);

  .skeleton__block-item {
    @include skeleton-block();
  }
}
</style>
