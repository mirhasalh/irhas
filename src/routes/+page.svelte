<script lang="ts">
  import type { LayoutData } from './$types'
  import { website } from '$lib'
  import { l } from '$lib/shared.svelte'
  import MetaHome from '$components/MetaHome.svelte'
  import PostCard from '$components/PostCard.svelte'
  import PixelCanvas from '$components/PixelCanvas.svelte'
  import ArrowDown from '$icons/ArrowDown.svelte'
  import Dart from '$icons/tech/Dart.svelte'
  import Flutter from '$icons/tech/Flutter.svelte'
  import Figma from '$icons/tech/Figma.svelte'
  import Go from '$icons/tech/Go.svelte'
  import Java from '$icons/tech/Java.svelte'
  import Next from '$icons/tech/Next.svelte'
  import Nuxt from '$icons/tech/Nuxt.svelte'
  import Spring from '$icons/tech/Spring.svelte'
  import Svelte from '$icons/tech/Svelte.svelte'
  import Swift from '$icons/tech/Swift.svelte'
  import Rive from '$icons/tech/Rive.svelte'
  import Marquee from '$components/Marquee.svelte'

  const techStacks = [
    { id: 0, title: 'Dart' },
    { id: 1, title: 'Flutter' },
    { id: 2, title: 'Figma' },
    { id: 3, title: 'Svelte' },
    { id: 4, title: 'Nuxt' },
    { id: 5, title: 'Go' },
    { id: 6, title: 'Next' },
    { id: 7, title: 'Swift' },
    { id: 8, title: 'Java' },
    { id: 9, title: 'Spring' },
    { id: 10, title: 'Rive' }
  ]

  let { data }: { data: LayoutData } = $props()

  const obj = $derived(data as any),
    posts = $derived(obj.posts as App.Post[]),
    mobileApps = $derived(obj.apps as App.MobileApp[]),
    sortedPosts = $derived(posts.filter((post) => post.publishedAt).sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()))
</script>

<MetaHome />

<div class="hero relative min-h-screen">
  <div class="reveal-curtain"></div>
  <div class="hero-overlay-gradient-primary reveal-blur animation-delay-2000"></div>
  <div class="hero-content relative z-10 text-center">
    <div class="max-w-md">
      <h1 class="reveal-fade-fly-blur merriweather text-5xl font-bold md:text-7xl">
        <span class="animate-wave">👋</span>
        {l('greetings.hello')}
        <br />
        {l('greetings.name')}
      </h1>
      <p class="roboto reveal-fade-fly-blur animation-delay-250 py-6 md:text-xl">
        {l('welcome')}
      </p>
      <div class="tooltip tooltip-bottom" data-tip="See recent posts">
        <a href="#recent-posts" class="reveal-fade-fly-blur animation-delay-500 btn btn-ghost" title="See recent posts">
          <ArrowDown />
          <span class="hidden">See recent posts</span>
        </a>
      </div>
    </div>
  </div>
  <PixelCanvas />
</div>

<section id="marquee-section" class="reveal-fade-fly-blur animation-delay-2000 relative">
  <Marquee>
    <div class="flex gap-1">
      {#each techStacks as tech (tech.id)}
        <div class="flex items-center justify-center p-6">
          {#if tech.title === 'Flutter'}
            <Flutter />
          {:else if tech.title === 'Figma'}
            <Figma />
          {:else if tech.title === 'Go'}
            <Go />
          {:else if tech.title === 'Java'}
            <Java />
          {:else if tech.title === 'Next'}
            <Next />
          {:else if tech.title === 'Nuxt'}
            <Nuxt />
          {:else if tech.title === 'Spring'}
            <Spring />
          {:else if tech.title === 'Svelte'}
            <Svelte />
          {:else if tech.title === 'Swift'}
            <Swift />
          {:else if tech.title === 'Rive'}
            <Rive />
          {:else}
            <Dart />
          {/if}
        </div>
      {/each}
    </div>
  </Marquee>
</section>

<section class="relative mx-auto max-w-3xl">
  <div class="relative bottom-[100px]">
    <h2 id="apps" class="merriweather m-4 text-4xl font-bold">
      {l('apps')}
    </h2>
    <ul class="list bg-base-100 rounded-box mx-4 shadow-md">
      {#each mobileApps as app (app.id)}
        {@const url = `/app/${app.slug}`}
        <li class="list-row">
          <div><img class="rounded-box size-10" src={`${website}/${app.icon}`} alt={app.title} /></div>
          <div>
            <div class="jetbrains-mono text-xs font-semibold uppercase opacity-60">{app.year}</div>
            <div class="merriweather font-bold">{app.title}</div>
          </div>
          <p class="list-col-wrap text-xs">
            {app.shortDescription}
          </p>
          <a class="btn" href={url} aria-label="link">
            <svg class="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="mx-auto max-w-4xl">
  <h2 id="recent-posts" class="merriweather m-4 text-4xl font-bold">
    {l('recentPosts')}
  </h2>
  <ul class="recent-posts-grid grid gap-4 px-4 md:grid-cols-2">
    {#each sortedPosts as post (post.id)}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
  <div class="my-4 flex justify-center">
    <a class="btn" href="/posts">
      {l('viewAll')}
    </a>
  </div>
</section>
