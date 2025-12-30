import type { ProductType } from "./ProductType"

export type ProductsAPIResponse = {
  limit: number
  skip: number
  total: number
  products: ProductType[]
} 