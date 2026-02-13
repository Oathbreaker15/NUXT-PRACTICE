<script setup lang="ts">
import { setBlockSize } from '@/composables/useSkeletonBlockSize'
</script>

<template>
  <div class="product-skeleton">
    <div
      :style="setBlockSize(200, 200)"
      class="product-skeleton__item product-skeleton__item--image"
    ></div>

    <div class="product-skeleton__info">
      <div :style="setBlockSize(262, 22)" class="product-skeleton__item"></div>
      <div :style="setBlockSize(140, 22)" class="product-skeleton__item"></div>

      <div class="product-skeleton__info-stars-wrapper">
        <div :style="setBlockSize(100)" class="product-skeleton__item"></div>
        <div :style="setBlockSize(22)" class="product-skeleton__item"></div>
      </div>

      <div :style="setBlockSize(150, 18)" class="product-skeleton__item"></div>

      <div class="product-skeleton__info-common">
        <div :style="setBlockSize(120)" class="product-skeleton__item"></div>
        <div :style="setBlockSize(130)" class="product-skeleton__item"></div>
        <div :style="setBlockSize(284)" class="product-skeleton__item"></div>
        <div :style="setBlockSize(120)" class="product-skeleton__item"></div>
      </div>

      <div class="product-skeleton__info-price-and-availability">
        <div :style="setBlockSize(102, 24)" class="product-skeleton__item"></div>
        <div :style="setBlockSize(90, 24)" class="product-skeleton__item"></div>
      </div>
    </div>
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
  padding: 16px;
  cursor: pointer;

  .product-skeleton__item {
    @include skeleton-block();
  }

  .product-skeleton__item--image {
    align-self: center;
    margin-bottom: var(--margin-bottom-4);
  }

  .product__info {
    display: flex;
    flex-direction: column;
    margin-top: auto;
  }

  .product-skeleton__info {
    > .product-skeleton__item:nth-child(2) {
      margin-top: var(--margin-top-4);
    }
  }

  .product-skeleton__info-stars-wrapper {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    margin-top: var(--margin-top-4);

    + .product-skeleton__item {
      margin-top: var(--margin-top-8);
    }
  }

  .product-skeleton__info-common {
    margin-top: var(--margin-top-8);
    margin-bottom: var(--margin-bottom-12);

    .product-skeleton__item:nth-child(2),
    .product-skeleton__item:nth-child(3) {
      margin-top: var(--margin-top-4);
    }

    .product-skeleton__item:nth-child(4) {
      margin-top: var(--margin-top-4);
    }
  }

  .product-skeleton__info-price-and-availability {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--margin-top-8);
  }
}
</style>
