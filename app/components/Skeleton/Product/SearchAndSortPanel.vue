<script setup lang="ts">
import { setBlockSize } from '@/composables/useSkeletonBlockSize'
</script>

<template>
  <div class="products__search-and-sort-panel">
    <div :style="setBlockSize(332, 30)" class="skeleton__block skeleton__block--hide-on-mob">
      <div :style="setBlockSize(112, 18)" class="skeleton__block-item"></div>

      <div :style="setBlockSize(202, 35)" class="skeleton__block-item"></div>
    </div>

    <div
      style="width: 100%"
      class="skeleton__block--wrap skeleton__block--hide-on-desk skeleton__block--hide-on-tab"
    >
      <div
        :style="`${setBlockSize(112, 18)}`"
        class="skeleton__block-item"
      ></div>

      <div :style="setBlockSize(320, 30)" class="skeleton__block-item"></div>
    </div>

    <div :style="setBlockSize(153, 30)" class="skeleton__block skeleton__block--hide-on-mob">
      <div :style="setBlockSize(56, 18)" class="skeleton__block-item"></div>

      <div :style="setBlockSize(90, 30)" class="skeleton__block-item"></div>
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
  margin-bottom: var(--space-8);
  justify-content: space-between;
}

.skeleton__block {
  justify-content: start;
  gap: 8px;

  .skeleton__block-item {
    @include skeleton-block();
  }
}

@media (max-width: $mobile-breakpoint) {
  .skeleton__block--wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;

    .skeleton__block-item {
      @include skeleton-block();
    }
  }
}

@media (min-width: $desktop-breakpoint) {
  .skeleton__block--hide-on-desk {
    display: none;
  }
}

@media (min-width: $mobile-breakpoint) and (max-width: $tablet-breakpoint) {
  .skeleton__block--hide-on-tab {
    display: none;
  }
}

@media (max-width: $mobile-breakpoint) {
  .skeleton__block--hide-on-mob {
    display: none;
  }
}
</style>
