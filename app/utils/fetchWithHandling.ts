export async function fetchWithHandling<T>(url: string, query?: Record<string, unknown>): Promise<T> {
  try {
    return await $fetch<T>(url, { query }) as T
  } catch (error) {
    console.error(`API Error: ${url}`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch data'
    })
  }
}
