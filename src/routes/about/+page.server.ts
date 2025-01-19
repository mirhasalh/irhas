import type { PageLoad } from './$types'
import { compile } from 'mdsvex'
import { light, dark } from '$lib'

export const load: PageLoad = async () => {
  const l = await compile(light)
  const d = await compile(dark)
  return { light: l, dark: d }
}