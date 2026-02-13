<script setup lang="ts">
import type { ProductType } from '~~/shared/types/Product/ProductType'
import { PRODUCT_PATHS } from '~/constants/product/paths'
const fallbackProductImg = PRODUCT_PATHS.FALLBACK_IMAGE

interface IProps {
  product: ProductType
  searchQuery: string
}

const props = defineProps<IProps>()
const currentImage = ref(props.product.images?.[0] || fallbackProductImg)
const handleImageError = () => {
  currentImage.value = fallbackProductImg
}
const availabilityStatusClass = computed(() => {
  if (props.product.availabilityStatus === 'In Stock') {
    return 'product__info-availability_in-stock'
  } else if (props.product.availabilityStatus === 'Low Stock') {
    return 'product__info-availability_low-stock'
  } else {
    return 'product__info-availability_out-of-stock'
  }
})
</script>

<template>
  <article class="product">
    <NuxtImg
      class="product__image"
      :src="currentImage"
      :alt="`Image for ${props.product.title} product`"
      loading="lazy"
      :placeholder="fallbackProductImg"
      width="200px"
      height="200px"
      @error="handleImageError"
    />

    <section class="product__info">
      <h2
        class="product__info-title"
        v-html="highlightSubstring(props.product.title, searchQuery)"
      ></h2>

      <div class="product__info-stars-wrapper">
        <div class="product__info-stars">
          <div
            v-if="props.product.rating"
            :style="`width: ${20 * props.product.rating}%;`"
            class="product__info-stars-filled"
          ></div>
        </div>
        <div class="product__info-reviews-amount">({{ props.product.reviews.length }})</div>
      </div>

      <p class="product__info-sku">{{ props.product.sku }}</p>

      <div class="product__info-common">
        <p v-if="props.product.brand" class="product__info-common-brand">
          Brand: <b>{{ props.product.brand }}</b>
        </p>
        <p class="product__info-common-category">
          Category: <b>{{ props.product.category }}</b>
        </p>
        <p class="product__info-common-shipping">
          Shipping Information: <b>{{ props.product.shippingInformation }}</b>
        </p>
      </div>

      <div class="product__info-price-and-availability">
        <p class="product__info-price">
          Price: <b>{{ props.product.price }}</b>
        </p>
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
  padding: 14px;
  cursor: pointer;

  &:has(.product__info-availability_out-of-stock) {
    opacity: 0.8;
    cursor: default;
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--grey-emphasized);
      box-shadow: 0 16px 24px 0 var(--grey);
    }
  }

  &__image {
    width: 100%;
    max-height: 200px;
    margin-bottom: auto;
    object-fit: contain;
  }

  .product__info {
    display: flex;
    flex-direction: column;
    height: 100%;

    :deep(.highlight) {
      background: var(--brand-light);
    }

    &-title {
      font-size: 20px;
      font-weight: 700;
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

    &-stars-wrapper {
      display: flex;
      align-items: center;
      margin-top: var(--margin-top-4);
    }

    &-stars {
      background: url('/imgs/product/stars.svg') no-repeat 0 -16px;
      background-size: cover;
      margin-left: -5px;
    }

    &-stars-filled {
      display: block;
      background: url('/imgs/product/stars.svg') repeat-x 0 -1px;
    }

    &-common {
      color: var(--dark-grey);
      margin-top: var(--margin-top-8);
      margin-bottom: var(--margin-bottom-12);

      > *:not(p:first-of-type) {
        margin-top: var(--margin-top-4);
      }

      b {
        color: var(--black);
      }
    }

    &-price {
      color: var(--dark-grey);

      b {
        color: var(--black);
        font-size: 20px;
      }
    }

    &-price-and-availability {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: auto;
    }

    &-availability_in-stock {
      color: var(--green);
    }

    &-availability_low-stock {
      color: var(--brand-light);
    }

    &-availability_out-of-stock {
      color: var(--red);
    }
  }
}
</style>
