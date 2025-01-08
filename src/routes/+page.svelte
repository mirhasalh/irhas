<script lang="ts">
  import { onMount } from 'svelte'
  import type { LayoutData } from './$types'
  import { website } from '$lib'
  import { avatar } from '$lib/shared.svelte'
  import RecentWork from '$lib/components/RecentWork.svelte'
  import RiveAvatars from '$lib/components/RiveAvatars.svelte'
  import Posts from '$lib/components/Posts.svelte'

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  onMount(() => {
    document.body.classList.remove('bg-100')
    document.body.classList.add('bg-200')
  })
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>Irhas' Dev Journey | Code, Grit, and Growth</title>
  <meta name="description" content="Dive into the grind of coding adventures, leveling up skills, and sharing hard-earned insights on web development and tech." />
  <meta name="keywords" content="irhas blog, programming journey, web development, coding tips, front-end design, knowledge sharing, growth mindset, dev grind" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href={website} />

  <!-- Open graph metadata -->
  <meta property="og:title" content="Irhas' Dev Journey" />
  <meta property="og:description" content="Follow the journey of turning code into success, one commit at a time. Insights on web dev, design, and tech growth." />
  <meta property="og:image" content={`${website}/og-image.jpg`} />
  <meta property="og:url" content={website} />
  <meta property="og:type" content="website" />

  <!-- Twitter metadata -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Irhas' Dev Journey" />
  <meta name="twitter:description" content="Turning struggles into solutions—explore tips, lessons, and stories from the world of coding and design." />
  <meta name="twitter:image" content={`${website}/twitter-image.jpg`} />
  <meta name="twitter:site" content="@irhasdev" />
</svelte:head>

<section>
  <div class={`hero animated-fade-in`}>
    <RiveAvatars />
    <div class={`greetings`}>
      <h1 class={`shrink`}>
        Hello there
        <span class={`wave`}>👋</span>
      </h1>
      <p class={`shrink`}>
        I'm Irhas, welcome to my site.
        <br />
        <span class={`hobby`} class:reveal={avatar.hover}> I like drawing, btw. 🤫 </span>
      </p>
    </div>
  </div>
</section>
<section class={`h-paddings mb`}>
  <Posts {posts} />
</section>
<section class={`h-paddings`}>
  <RecentWork />
</section>
