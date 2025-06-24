<script lang="ts">
  import type { LayoutData } from './$types'
  import { apps, techStacks } from '$lib'
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

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]
</script>

<MetaHome />

<div class="hero min-h-screen relative">
  <div class="reveal-curtain"></div>
  <div class="hero-overlay-gradient-primary reveal-blur animation-delay-2000"></div>
  <div class="hero-content text-center relative z-10">
    <div class="max-w-md">
      <h1 class="reveal-fade-fly-blur text-5xl font-bold merriweather md:text-7xl">
        <span class="animate-wave">👋</span>
        {l('greetings.hello')}
        <br />
        {l('greetings.name')}
      </h1>
      <p class="reveal-fade-fly-blur animation-delay-250 py-6 md:text-xl">
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

<section id="marquee-section" class="relative reveal-fade-fly-blur animation-delay-2000">
  <Marquee>
    <div class="flex gap-1">
      {#each techStacks as tech (tech.id)}
        <div class="p-6 flex justify-center items-center">
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

<section class="max-w-4xl mx-auto">
  <h2 id="recent-posts" class="merriweather text-4xl m-4 font-bold">
    {l('recentPost')}
  </h2>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each posts as post (post.slug)}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
  <div class="flex justify-center my-4">
    <a class="btn" href="/posts">
      {l('viewAll')}
    </a>
  </div>
</section>

<section class="max-w-4xl mx-auto mt-10">
  <h2 id="apps" class="merriweather text-4xl m-4 font-bold">
    {l('apps')}
  </h2>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each apps as app (app.id)}
      {@const url = `/app/${app.name.replace(' ', '-').toLowerCase()}`}
      <li>
        <a class="post-card card bg-base-100 shadow-sm hover:shadow-xl" href={url}>
          <figure class="post-card-graphic">
            <img src={app.featureGraphic} alt={app.name} width="100%" />
          </figure>
          <div class="card-body">
            <span class="jetbrains-mono uppercase text-base-content/50"><strong>{app.year}</strong></span>
            <h2 class="merriweather card-title">{app.name}</h2>
            <p><span>{app.description}</span></p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
