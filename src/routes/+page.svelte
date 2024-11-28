<script lang="ts">
  import type { LayoutData } from './$types'
  import Posts from '$lib/components/Posts.svelte'
  import { website } from '$lib'

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>Irhas' dev blog | Code, coffee, and casual chats</title>
  <meta name="description" content="Relax and read fun takes on coding, web dev, and tech stuff—no stress, just vibes." />
  <meta name="keywords" content="irhas blog, irhas, blog, chill, web dev, coding, fun, tech tips" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href={website} />

  <!-- Open graph metadata -->
  <meta property="og:title" content="Irhas' dev blog" />
  <meta property="og:description" content="Kick back and enjoy lighthearted insights on web dev and tech!" />
  <meta property="og:image" content={`${website}/og-image.jpg`} />
  <meta property="og:url" content={website} />
  <meta property="og:type" content="website" />

  <!-- Twitter metadata -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Irhas' dev blog" />
  <meta name="twitter:description" content="Kick back and enjoy lighthearted insights on web dev and tech!" />
  <meta name="twitter:image" content={`${website}/twitter-image.jpg`} />
  <meta name="twitter:site" content="@irhasdev" />
</svelte:head>

<section class={`h-paddings`}>
  <hr class={`transparent`} />
  <Posts {posts} />
</section>
