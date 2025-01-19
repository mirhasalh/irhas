<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import 'highlight.js/styles/atom-one-dark.css'
  import Sanitized from '$lib/components/Sanitized.svelte'
  import { formatDate, website, initFadeInAnimation } from '$lib'
  import { PostPageState } from './state.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new PostPageState(),
    articelEl: HTMLElement,
    cover = data.post.imageUrl ? data.post.imageUrl : `${website}/og-image.jpg`

  if (browser) pageState.registerLanguages()

  const onArticelEl = () => {
    if (articelEl) {
      articelEl.querySelectorAll('pre code').forEach((codeEl) => {
        pageState.highlightElement(codeEl as HTMLElement)
      })
    }
  }

  onMount(() => {
    initFadeInAnimation()
    document.body.classList.remove('bg-200')
    document.body.classList.add('bg-100')
    onArticelEl()
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

<article bind:this={articelEl}>
  <div class={`post-info`}>
    <p class={`uppercase`}><small><strong>{data.post.categories.join(', ')}</strong></small></p>
    <p><small>{`${formatDate(data.post.publishedAt)} • ${data.post.readingTime} min read`}</small></p>
  </div>
  <h1>{data.post.title}</h1>
  <p>{data.post.excerpt}</p>
  {#if data.post.videoUrl}
    <video width="100%" autoplay loop muted playsinline>
      <source src={data.post.videoUrl} type="video/mp4" />
      <track src="" kind="captions" srclang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  {:else if data.post.imageUrl}
    <img src={data.post.imageUrl} alt={data.post.title} width="100%" />
  {/if}
  <Sanitized html={data.code} />
  <ul class={`flex-wrap px`}>
    {#each data.post.tags as tag}
      {@const link = `/posts/tagged/${tag}`}
      <li class={`list-item`}><a class={`btn sm link`} href={link}>{`#${tag}`}</a></li>
    {/each}
  </ul>
</article>
