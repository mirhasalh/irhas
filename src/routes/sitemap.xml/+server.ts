import { getPosts, website } from '$lib'

export const prerender = true

const posts = await getPosts(0, 100)

const getPostUrl = (slug: string) => `${website}/post/${slug}`

export async function GET({ setHeaders }) {
  setHeaders({
    'Cache-Control': `max-age=0, s-max-age=600`,
    'Content-Type': 'application/xml'
  })

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      <url>
        <loc>${website}</loc>
        <priority>1.0</priority>
      </url>

      ${posts
      .map(
        (post) => `<url>
            <loc>${getPostUrl(post.slug)}</loc>
            <lastmod
              >${post.publishedAt
            ? new Date(post.publishedAt).toISOString()
            : new Date(post.publishedAt).toISOString()
          }</lastmod
            >
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>`
      )
      .join('')}
    </urlset>`

  return new Response(xml)
}
