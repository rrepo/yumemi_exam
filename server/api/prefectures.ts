import { fetchFromApi } from '../utils/api'
import { getQuery, createError, defineEventHandler } from "h3"; // ← これ重要！

export default defineEventHandler(async (event) => {
  try {
    const data = await fetchFromApi('/api/v1/prefectures', event)
    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch prefectures data',
    })
  }
})