export default defineEventHandler(async (event) => {
  try {
    return $fetch<ProductsAPIResponse>('https://dummyjson.com/products').then(data => data)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products',
    })
  }
})