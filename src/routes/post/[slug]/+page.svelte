<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import 'highlight.js/styles/atom-one-dark.css'
  import { formatDate, website, formatSlug } from '$lib'
  import { PostPageState } from './state.svelte'
  import Sanitized from '$components/Sanitized.svelte'
  import Facebook from '$icons/socials/Facebook.svelte'
  import Linkedin from '$icons/socials/Linkedin.svelte'
  import Telegram from '$icons/socials/Telegram.svelte'
  import WhatsApp from '$icons/socials/WhatsApp.svelte'
  import Twitter from '$icons/socials/Twitter.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new PostPageState(),
    parsedEl: HTMLElement

  const cover = data.post.imageUrl ? `/api/cdn-sanity?url=${data.post.imageUrl}` : `${website}/og-image.jpg`,
    headings = data.post.headings ? data.post.headings.map((item) => item.replace(/-/g, ' ')) : [],
    keywords = [data.post.title, ...headings, ...data.post.tags],
    f = `https://www.facebook.com/sharer/sharer.php?u=${website}/post/${data.post.slug}`,
    x = `https://twitter.com/intent/tweet?text=Check%20this%20out!&url=${website}/post/${data.post.slug}`,
    l = `https://www.linkedin.com/sharing/share-offsite/?url=${website}/post/${data.post.slug}`,
    w = `https://wa.me/?text=Check%20this%20out!%20${website}/post/${data.post.slug}`,
    t = `https://t.me/share/url?url=${website}/post/${data.post.slug}&text=Check%20this%20out!`,
    shareBtnStyle = 'btn btn-circle btn-ghost btn-outline btn-sm`'

  const shareLinks = [
    { id: 'f', url: f },
    { id: 'l', url: l },
    { id: 't', url: t },
    { id: 'w', url: w },
    { id: 'x', url: x }
  ]

  if (browser) pageState.registerLanguages()

  const onElement = () => {
    pageState.highlightElement(parsedEl)
    pageState.setCodeStyle(parsedEl)
  }

  onMount(() => {
    if (parsedEl) onElement()
  })
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
  <meta name="keywords" content={keywords.join(', ')} />

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

<div class="sticky top-0 z-20 bg-base-300 hidden md:flex">
  <div class="breadcrumbs text-sm mx-auto">
    <ul>
      <li><a href="/">🏠</a></li>
      <li><a href="/posts">posts</a></li>
      <li>{data.post.slug}</li>
    </ul>
  </div>
</div>
<article class="article">
  <div class="max-w-3xl mx-auto px-4 pt-4">
    <a class="btn btn-sm mb-4 md:hidden" href="/posts" title="Back to posts">←</a>
    <br />
    <span class="font-medium text-base-content/50 uppercase">{data.post.categories.join(', ')}</span>
    <br />
    <span class="font-medium text-base-content/70"><small>{`${formatDate(data.post.publishedAt)} • ${data.post.readingTime} min read`}</small></span>
    <h1 class="merriweather font-bold text-3xl my-4">{data.post.title}</h1>
    <p>{data.post.excerpt}</p>
    <div class="flex gap-2 flex-wrap my-4">
      {#each shareLinks as s, i (s.id)}
        <a class={shareBtnStyle} href={s.url}>
          {#if s.id === 'f'}
            <Facebook />
          {:else if s.id === 'l'}
            <Linkedin />
          {:else if s.id === 't'}
            <Telegram />
          {:else if s.id === 'w'}
            <WhatsApp />
          {:else if s.id === 'x'}
            <Twitter />
          {/if}
        </a>
      {/each}
    </div>
  </div>
  <figure class="post-card-graphic max-w-4xl mx-auto my-10 overflow-clip lg:rounded-lg">
    {#if data.post.videoUrl}
      <video autoplay loop muted playsinline width="100%">
        <source src={`/api/cdn-sanity?url=${data.post.videoUrl}`} type="video/mp4" />
        <track src="" kind="captions" srclang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    {:else if data.post.imageUrl}
      <img src={`/api/cdn-sanity?url=${data.post.imageUrl}`} alt={data.post.title} width="100%" />
    {:else}
      <img src={`${website}/og-image.jpg`} alt={data.post.title} width="100%" />
    {/if}
    <figcaption class="hidden">{data.post.title}</figcaption>
  </figure>
  <div class="max-w-3xl mx-auto px-4">
    <div class="collapse border-base-300 border">
      <input type="checkbox" />
      <div class="collapse-title font-semibold">Table of contents</div>
      <div class="collapse-content text-sm">
        <ul class="list list-mb-2">
          {#each data.post.headings as heading (heading)}
            <li>
              <button type="button" onclick={() => pageState.onHeading(heading)}>{formatSlug(heading)}</button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  <div class="article-content max-w-3xl mx-auto my-4 px-4" bind:this={parsedEl}>
    <Sanitized html={data.code} />
  </div>
  <div class="max-w-3xl mx-auto px-4">
    <ul class="flex gap-2 flex-wrap">
      {#each data.post.tags as tag (tag)}
        {@const url = `/posts/tagged/${tag}`}
        <li><a class="btn btn-sm btn-primary" href={url}>{`#${tag}`}</a></li>
      {/each}
    </ul>
  </div>
</article>
