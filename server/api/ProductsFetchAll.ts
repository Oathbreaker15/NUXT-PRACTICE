import { fetchWithHandling } from '~~/app/utils/fetchWithHandling'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return fetchWithHandling<ProductsAPIResponse>('https://dummyjson.com/products', {
    limit: query.limit || 8,
    skip: query.skip || 8
  })
})
