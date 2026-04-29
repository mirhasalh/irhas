import type { PageServerLoad } from './$types'
import { getPosts, getMobileApps } from '$lib'

export const prerender = true

export const load: PageServerLoad = async () => {
  const posts = await getPosts(0, 5)
  const apps = await getMobileApps(0, 5)
  return { posts, apps }
}
