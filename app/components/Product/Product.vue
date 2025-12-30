<script setup lang="ts">
import type { ProductType } from '~~/shared/types/ProductType';
import fallbackProductImg from '~/assets/imgs/product/product.svg'

interface Props {
  product: ProductType
}

const props = defineProps<Props>()
const currentImage = ref(props.product.images?.[0] || fallbackProductImg)
const handleImageError = () => {
  currentImage.value = fallbackProductImg
}
const availabilityStatusClass = computed(() =>
  props.product.availabilityStatus === 'In Stock'
    ? 'product__info-availability_in-stock'
    : 'product__info-availability_out-of-stock'
)
</script>

<template>
  <article class="product">
    <NuxtImg
      class="product__image"
      :src="currentImage"
      :alt="`Изображение для товара ${props.product.title}`"
      loading="lazy"
      @error="handleImageError"
    />

    <section class="product__info">
      <h2 class="product__info-title">{{ props.product.title }}</h2>

      <div class="product__info-stars">
        <div
          v-if="props.product.rating"
          :style="`width: ${20 * props.product.rating}%;`"
          class="product__info-stars-filled"
        ></div>
      </div>

      <p class="product__info-sku">{{ props.product.sku }}</p>

      <div class="product__info-price-and-availability">
        <p class="product__info-price">Price: {{ props.product.price }}</p>
        <p :class="availabilityStatusClass">
          {{ props.product.availabilityStatus }}: {{ props.product.stock }}
        </p>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
.product {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 12px;
  border: 2px solid var(--grey-light);
  padding: 16px;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border-color: var(--grey-emphasized);
      box-shadow: 0 16px 24px 0 var(--grey);
    }
  }

  .product__info {
    display: flex;
    flex-direction: column;
    margin-top: auto;

    &-title {
      font-size: 25px;
      font-weight: 700;
      line-height: 32px;
      color: var(--black);
    }

    &-sku {
      margin-top: var(--margin-top-8);
      color: var(--dark-grey-opaque);
    }

    &-stars,
    &-stars-filled {
      width: 100px;
      height: 16px;
    }

    &-stars {
      background: url('~/assets/imgs/product/stars.svg') no-repeat 0 -16px;
      background-size: cover;
      margin-left: -5px;
      margin-top: var(--margin-top-4);
    }

    &-stars-filled {
      display: block;
      background: url('~/assets/imgs/product/stars.svg') repeat-x 0 -1px;
    }

    &-price {
      margin-top: var(--margin-top-8);
    }

    &-image {
      width: 100%;
      max-height: 200px;
      margin-bottom: auto;
    }

    &-price-and-availability {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    &-availability_in-stock {
      margin-top: var(--margin-top-4);
      color: var(--green);
    }

    &-availability_out-of-stock {
      margin-top: var(--margin-top-4);
      color: var(--red);
    }
  }
}
</style>
