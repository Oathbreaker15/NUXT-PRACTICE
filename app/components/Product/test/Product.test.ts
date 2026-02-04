import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Product from '../Product.vue'
import type { ProductType } from '#imports'
import { PRODUCT_PATHS } from '~/constants/product/paths'
const fallbackProductImg = PRODUCT_PATHS.FALLBACK_IMAGE;

const mockProduct: ProductType = {
  "id": 29,
  "title": "Juice",
  "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
  "category": "groceries",
  "price": 3.99,
  "discountPercentage": 12.06,
  "rating": 3.94,
  "stock": 50,
  "tags": ["beverages"],
  "sku": "GRO-BRD-JUI-029",
  "weight": 1,
  "dimensions": {
    "width": 18.56,
    "height": 21.46,
    "depth": 28.02
  },
  "warrantyInformation": "6 months warranty",
  "shippingInformation": "Ships in 1 week",
  "availabilityStatus": "In Stock",
  "reviews": [{
    "rating": 5,
    "comment": "Excellent quality!",
    "date": "2025-04-30T09:41:02.053Z",
    "reviewerName": "Nolan Gonzalez",
    "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
  }],
  "returnPolicy": "No return policy",
  "minimumOrderQuantity": 25,
  "meta": {
    "createdAt": "2025-04-30T09:41:02.053Z",
    "updatedAt": "2025-04-30T09:41:02.053Z",
    "barcode": "6936112580956",
    "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
  },
  "images": ["https://cdn.dummyjson.com/product-images/groceries/juice/1.webp"],
  "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp"
}

describe('Product component test', () => {
  it('renders correctly', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct
      }
    })

    expect(wrapper.get('.product__info-title').text()).toBe('Juice')
    expect(wrapper.get('.product__info-sku').text()).toBe('GRO-BRD-JUI-029')
    expect(wrapper.get('.product__info-price').text()).toContain('3.99')
    expect(wrapper.find('.product__info-stars-filled').exists()).toBeTruthy()
    expect(wrapper.get('.product__info-availability_in-stock').text()).toContain('50')
    expect(wrapper.get('.product__image').attributes('src')).toBe(fallbackProductImg)
  })

  it('should show fallback image', () => {
    const wrapper = mount(Product, {
      props: {
        product: {...mockProduct, images: []}
      }
    })

    expect(wrapper.get('.product__image').attributes('src')).toContain(fallbackProductImg)
  })

  it('should not have rating block', () => {
    const wrapper = mount(Product, {
      props: {
        product: {...mockProduct, rating: 0}
      }
    })

    expect(wrapper.find('.product__info-stars-filled').exists()).toBeFalsy()
  })

  it('should have correct class when not in stock', () => {
    const wrapper = mount(Product, {
      props: {
        product: {...mockProduct, availabilityStatus: 'Out of Stock'}
      }
    })

    expect(wrapper.find('.product__info-availability_out-of-stock').exists()).toBeTruthy()
  })
})