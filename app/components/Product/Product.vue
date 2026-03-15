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
    return 'product__availability_in-stock'
  } else if (props.product.availabilityStatus === 'Low Stock') {
    return 'product__availability_low-stock'
  } else {
    return 'product__availability_out-of-stock'
  }
})

const addToCart = () => {
  alert('there is no cart yet hehe')
}
</script>

<template>
  <article class="product">
    <div class="product__inner">
      <div class="product__image-wrapper">
        <div class="product__image-stars-wrapper">
          <div class="product__image-stars"></div>

          <div class="product__image-rating">{{ props.product.rating }}</div>
        </div>

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

        <p :class="['product__availability', availabilityStatusClass]">
          {{ props.product.availabilityStatus }}: {{ props.product.stock }}
        </p>
      </div>

      <section class="product__info">
        <h2
          class="product__info-title"
          v-html="highlightSubstring(props.product.title, searchQuery)"
        ></h2>

        <div class="product__info-hideable">
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
              {{ props.product.shippingInformation }}
            </p>
          </div>
        </div>

        <p class="product__info-price">
          Price: <b>{{ props.product.price }}</b>
        </p>
      </section>

      <button class="product__add-to-cart" @click="addToCart">Add to cart</button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product {
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  min-height: 350px;

  .product__inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 14px;
    box-sizing: border-box;
    border-radius: 12px;
    border: 2px solid var(--grey-light);
  }

  &:has(.product__info-availability_out-of-stock) {
    opacity: 0.8;
    cursor: default;
  }

  @media (hover: hover) {
    &:hover .product__inner {
      border-color: var(--grey-emphasized);
      box-shadow: 0 16px 24px 0 var(--grey);
    }
  }

  .product__image-wrapper {
    position: relative;

    .product__image-stars-wrapper {
      position: absolute;
      top: 0;
      left: -4px;
      display: flex;
      gap: 4px;

      .product__image-stars {
        position: relative;
        top: -1px;
        width: 22px;
        height: 16px;
        background: url('/imgs/product/stars.svg') no-repeat 0 0;
      }

      .product__image-rating {
        font-weight: bold;
      }
    }

    .product__availability {
      position: absolute;
      top: 0;
      right: -4px;

      &.product__availability_in-stock {
        flex-shrink: 0;
        color: var(--green);
      }

      &.product__availability_low-stock {
        flex-shrink: 0;
        color: var(--brand-light);
      }

      &.product__availability_out-of-stock {
        flex-shrink: 0;
        color: var(--red);
      }
    }
  }

  .product__add-to-cart {
    border: none;
    outline: none;
    box-sizing: border-box;
    background-color: var(--black-light);
    color: var(--white);
    border-radius: 8px;
    height: 32px;
    cursor: pointer;
    font-weight: bold;
    margin-top: var(--space-16);
    flex-shrink: 0;

    @include hover-active-brand-background-color();
  }

  .product__image {
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

    .product__info-title {
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      color: var(--black);
      margin-bottom: 8px;
    }

    .product__info-sku {
      margin-top: var(--space-4);
      color: var(--dark-grey-opaque);
    }

    .product__info-stars,
    .product__info-stars-filled {
      width: 100px;
      height: 15px;
    }

    .product__info-stars-wrapper {
      display: flex;
      align-items: center;
      margin-top: var(--space-4);
    }

    .product__info-stars {
      background: url('/imgs/product/stars.svg') no-repeat 0 -16px;
      background-size: cover;
      margin-left: -5px;
    }

    .product__info-stars-filled {
      display: block;
      background: url('/imgs/product/stars.svg') repeat-x 0 -1px;
    }

    .product__info-common {
      color: var(--dark-grey);
      margin-top: var(--space-8);
      margin-bottom: var(--space-12);
      font-size: 13px;

      > *:not(p:first-of-type) {
        margin-top: var(--space-4);
      }

      b {
        color: var(--black);
      }

      .product__info-common-shipping {
        font-weight: bold;
      }
    }

    .product__info-price {
      color: var(--dark-grey);
      flex-shrink: 0;
      margin-top: auto;

      b {
        color: var(--black);
        font-size: 20px;
      }
    }
  }

  @media (min-width: $tablet-breakpoint) {
    .product__info-hideable {
      display: none;
    }

    @media (hover: hover) {
      &:hover {
        .product__inner {
          position: absolute;
          min-height: 350px;
          z-index: 2;
          height: auto;
          background: var(--white);

          .product__info-hideable {
            display: block;
          }
        }
      }
    }
  }
}
</style>
