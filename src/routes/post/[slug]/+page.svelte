<script>
  import { website, name } from '$lib/info.js'
  import { afterNavigate } from '$app/navigation'
  import { format, parseISO } from 'date-fns'
  import { isMobile } from '$stores/isMobile'

  /** @type {import('./$types').PageData} */
  export let data

  // Generated open-graph image for sharing on social media.
  // See https://og-image.vercel.app/ for more options.
  const ogImageVercel = `https://og-image.vercel.app/**${encodeURIComponent(data.post.title)}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`,
    ogImage = `${data.post.src}` !== 'n/a' ? `${data.post.src}` : ogImageVercel,
    url = `${website}/${data.post.slug}`

  let applyBack = false

  afterNavigate(({ from }) => {
    if (from && from.url.pathname.startsWith('/posts')) applyBack = true
  })

  const goBack = () => {
    if (applyBack) history.back()
  }
</script>

<svelte:head>
  <title>{data.post.title} - {name}</title>
  <meta name="description" content={data.post.preview.text} />
  <meta name="author" content={name} />

  <!-- Facebook meta tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.preview.text} />
  <meta property="og:image" content={ogImage} />
  <meta property="article:published_time" content={format(new Date(parseISO(data.post.date)), "yyyy-MM-dd'T'HH:mm:ssXXX")} />

  <!-- Twitter meta tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.preview.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

{#if applyBack}
  <a href="/posts" on:click={goBack}>← Back</a>
{/if}
<div class={`post-data`}>
  <p><small><time datetime={data.post.date}>{format(new Date(parseISO(data.post.date)), `${$isMobile ? 'MMM d, yyyy' : 'MMMM d, yyyy'}`)}</time></small></p>
  <p><small>{data.post.readingTime}</small></p>
</div>
<hr />
<h1>{data.post.title}</h1>
{#if `${data.post.src}` !== 'n/a'}
  <div class={`blog-image-wrapper`} class:sm={$isMobile}>
    <img src={data.post.src} alt={data.post.title} />
  </div>
{/if}
<article><svelte:component this={data.component} /></article>
