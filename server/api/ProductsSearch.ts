export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const q = query.q

    return $fetch<ProductsAPIResponse>('https://dummyjson.com/products/search', {
      query: { q }
    }).then((data) => data)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products'
    })
  }
})
