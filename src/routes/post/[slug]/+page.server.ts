import type { PageLoad } from './$types'
import { compile } from 'mdsvex'
import { getPosts, getPost, parseCompiled } from '$lib'
import { rehype } from 'rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { parseDocument } from 'htmlparser2'

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug)
  const compiled = await compile(post.body)
  const code = compiled ? parseCompiled(compiled?.code) : ''

  let processedHtml = ''

  if (compiled?.code) {
    const file = await rehype().use(rehypeSlug).use(rehypeAutolinkHeadings).process(code)

    processedHtml = String(file)
  }

  const headings: string[] = [],
    document = parseDocument(processedHtml)

  function traverse(node: any) {
    if (node.tagName && /^h[1-6]$/i.test(node.tagName)) {
      const id =
        node.attribs?.id ||
        node.children?.[0]?.data
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, '-')

      if (id) headings.push(id)
    }

    if (node.children) node.children.forEach(traverse)
  }

  traverse(document)

  return { posts: await getPosts(0, 5), post, code: processedHtml, headings }
}
