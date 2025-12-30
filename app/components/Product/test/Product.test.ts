import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Product from '../Product.vue'
import type { ProductType } from '#imports'
import fallbackProductImg from '~/assets/imgs/product/product.svg'

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

// Также очисти пробелы в mockProduct.images и thumbnail
const cleanMock = { ...mockProduct }
cleanMock.images = [cleanMock.images[0]?.trim() as string]
cleanMock.thumbnail = cleanMock.thumbnail?.trim()

describe('Product component test', () => {
  const wrapper = mount(Product, {
    props: {
      product: mockProduct
    }
  })

  it('renders correctly', () => {
    wrapper.get('.product__info-title').text().includes('Juice')
    wrapper.get('.product__info-sku').text().includes('GRO-BRD-JUI-029')
    wrapper.get('.product__info-price').text().includes('3.99')
    wrapper.get('.product__info-stars').text().includes('3.94')
    wrapper.get('.product__info-availability_in-stock').text().includes('50')
  })
})