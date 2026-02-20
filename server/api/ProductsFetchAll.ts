export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = query.limit || 8
    const skip = query.skip || limit

    return $fetch<ProductsAPIResponse>('https://dummyjson.com/products', {
      query:
      {
        limit,
        skip
      }
    }).then(data => data)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products',
    })
  }
})