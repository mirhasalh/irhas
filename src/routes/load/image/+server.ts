import type { RequestHandler } from './$types'
import { loadImage } from '$lib'

export const GET: RequestHandler = async ({ url }) => {
  const imageUrl = url.searchParams.get('url') || ''
  const response = await loadImage(imageUrl)
  return response
}
