export type Product = {
  availabilityStatus: string
  brand: string
  category: string
  description: string
  dimensions: Dimension
  discountPercentage:10.48
  id: number
  images: number[]
  meta: Meta
  minimumOrderQuantity: number
  price: number
  rating: number
  returnPolicy: string
  reviews: Review[]
  shippingInformation: string
  sku: string
  stock: number
  tags: string[]
  thumbnail: string
  title: string
  warrantyInformation: string
  weight: number
}

type Dimension = {
  depth: number
  height: number
  width: number
}

type Meta = {
  barcode: string
  createdAt: string
  qrCode: string
  updatedAt: string
}

type Review = {
  depth: number
  height: number
  width: number
}