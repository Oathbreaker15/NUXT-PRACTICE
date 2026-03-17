<script setup lang="ts">
import { setBlockSize } from '~/utils/useSkeletonBlockSize'
</script>

<template>
  <div class="skeleton__block">
    <div :style="setBlockSize(106, 18)" class="skeleton__block-item"></div>

    <div :style="setBlockSize(60, 30)" class="skeleton__block-item"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton__block {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  margin-top: var(--space-16);

  .skeleton__block-item {
    @include skeleton-block();
  }
}
</style>
