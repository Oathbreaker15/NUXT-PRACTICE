export type ProductType = {
  availabilityStatus: string
  brand?: string
  category: string
  description: string
  dimensions: Dimension
  discountPercentage: number
  id: number
  images: string[]
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
  "rating": number,
  "comment": string,
  "date": string,
  "reviewerName": string,
  "reviewerEmail": string
}