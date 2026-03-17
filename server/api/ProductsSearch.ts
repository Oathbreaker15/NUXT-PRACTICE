import { fetchWithHandling } from '~~/app/utils/fetchWithHandling'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return fetchWithHandling<ProductsAPIResponse>('https://dummyjson.com/products/search', {
    q: query.q
  })
})
