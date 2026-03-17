<script setup lang="ts">
import { setBlockSize } from '~/utils/useSkeletonBlockSize'
</script>

<template>
  <div class="product-skeleton">
    <div
      :style="setBlockSize(200, 200)"
      class="product-skeleton__item product-skeleton__item--image"
    ></div>

    <div
      :style="`${setBlockSize(180, 16)}margin-bottom: 8px;`"
      class="product-skeleton__item"
    ></div>
    <div :style="`${setBlockSize(60, 16)}margin-bottom: 8px;`" class="product-skeleton__item"></div>

    <div class="product-skeleton__item-group-column product-skeleton__item--on-device">
      <div :style="`${setBlockSize(120, 16)}margin-top: 4px;`" class="product-skeleton__item"></div>

      <div :style="`${setBlockSize(135, 16)}margin-top: 4px;`" class="product-skeleton__item"></div>

      <div style="margin: 8px 0 12px" class="product-skeleton__item-group-column">
        <div style="margin-bottom: 4px" class="product-skeleton__item-group">
          <div :style="`${setBlockSize(46, 15)}`" class="product-skeleton__item"></div>
          <div :style="`${setBlockSize(108, 15)}`" class="product-skeleton__item"></div>
        </div>

        <div style="margin-bottom: 4px" class="product-skeleton__item-group">
          <div :style="`${setBlockSize(65, 15)}`" class="product-skeleton__item"></div>
          <div :style="`${setBlockSize(45, 15)}`" class="product-skeleton__item"></div>
        </div>

        <div :style="`${setBlockSize(140, 15)}`" class="product-skeleton__item"></div>
      </div>
    </div>

    <div class="product-skeleton__item-group">
      <div
        :style="`${setBlockSize(40, 16)}`"
        class="product-skeleton__item"
      ></div>
      <div
        :style="`${setBlockSize(60, 22)}`"
        class="product-skeleton__item"
      ></div>
    </div>

    <div
      :style="`${setBlockSize(204, 32)}border-radius: 8px;margin-top: 16px;`"
      class="product-skeleton__item"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.product-skeleton {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 12px;
  border: 2px solid var(--grey-light);
  background: var(--grey-light);
  padding: 14px;
  cursor: pointer;

  .product-skeleton__item-group {
    @include skeleton-block-group();
  }

  .product-skeleton__item-group-column {
    @include skeleton-block-group-column();
    width: 100%;

    .product-skeleton__item-group {
      width: 100%;
    }
  }

  .product-skeleton__item {
    @include skeleton-block();
  }

  .product-skeleton__item--image {
    align-self: center;
    margin-bottom: var(--space-4);

    @media (max-width: $tablet-breakpoint) {
      max-width: 100% !important;
    }
  }

  .product__info {
    display: flex;
    flex-direction: column;
    margin-top: auto;
  }

  .product-skeleton__info {
    > .product-skeleton__item:nth-child(2) {
      margin-top: var(--space-4);
    }
  }

  .product-skeleton__info-stars-wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    margin-top: var(--space-4);

    + .product-skeleton__item {
      margin-top: var(--space-8);
    }
  }

  .product-skeleton__info-common {
    margin-top: var(--space-8);
    margin-bottom: var(--space-12);

    .product-skeleton__item:nth-child(2),
    .product-skeleton__item:nth-child(3) {
      margin-top: var(--space-4);
    }

    .product-skeleton__item:nth-child(4) {
      margin-top: var(--space-4);
    }
  }

  .product-skeleton__info-price-and-availability {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: var(--space-8);
  }

  .product-skeleton__item--on-device {
    display: none;
  }

  @media (max-width: $tablet-breakpoint) {
    .product-skeleton__item--on-device {
      display: flex;
    }
  }
}
</style>
