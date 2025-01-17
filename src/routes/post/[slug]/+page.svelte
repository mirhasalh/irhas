<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import Sanitized from '$lib/components/Sanitized.svelte'
  import { formatDate, website, initFadeInAnimation } from '$lib'

  let { data }: { data: PageData } = $props(),
    cover = data.post.imageUrl ? data.post.imageUrl : `${website}/og-image.jpg`

  onMount(() => {
    initFadeInAnimation()
    document.body.classList.remove('bg-200')
    document.body.classList.add('bg-100')
  })
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
  <meta name="keywords" content={data.post.tags.join(', ')} />

  <!-- Open graph metadata -->
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.excerpt} />
  <meta property="og:image" content={cover} />
  <meta property="og:url" content={`${website}/post/${data.post.slug}`} />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={data.post.publishedAt} />
  <meta property="article:tag" content={data.post.tags.join(', ')} />

  <!-- Twitter cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.excerpt} />
  <meta name="twitter:image" content={cover} />

  <!-- Canonical URL -->
  <link rel="canonical" href={`${website}/post/${data.post.slug}`} />
</svelte:head>

<article>
  <div class={`post-info`}>
    <p class={`uppercase`}><small><strong>{data.post.categories.join(', ')}</strong></small></p>
    <p><small>{`${formatDate(data.post.publishedAt)} • ${data.post.readingTime} min read`}</small></p>
  </div>
  <h1>{data.post.title}</h1>
  <p>{data.post.excerpt}</p>
  <img src={data.post.imageUrl} alt={data.post.title} width="100%" />
  <Sanitized html={data.code} />
</article>
