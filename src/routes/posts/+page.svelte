<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import type { PageData } from './$types'
  import { HomePageState } from '../state.svelte'
  import Post from '$lib/components/Post.svelte'
  import { initFadeInAnimation } from '$lib'

  let { data }: { data: PageData } = $props(),
    pageState = new HomePageState(),
    selectedCategory = $state('all')

  if (browser) pageState.setReadingMode(false)

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[],
    categories = Array.from(new Set(posts.flatMap((post) => post.categories || [])))

  $effect(() => {
    if (selectedCategory) initFadeInAnimation()
  })

  onMount(() => initFadeInAnimation())
</script>

<section class={`px mb pt`}>
  <h1 class={`animated-fade-in`}>Latest posts</h1>
  <div class={`flex-wrap animated-fade-in`}>
    <label class={`choice-chip`} for={`all`}>
      <input type="radio" id={`all`} name={`all`} value={`all`} bind:group={selectedCategory} />
      <small>All</small>
    </label>
    {#each categories as category}
      <label class={`choice-chip`} for={category}>
        <input type="radio" id={category} name={category} value={category} bind:group={selectedCategory} />
        <small>{category}</small>
      </label>
    {/each}
  </div>
  <hr class={`md transparent`} />
  <ul class={`list`}>
    {#each posts as post}
      {@const link = `/post/${post.slug}`}
      {#if selectedCategory === 'all' ? true : post.categories.includes(selectedCategory)}
        <li role={`listitem`} class={`list-item post animated-fade-in`}>
          <Post {post} {link} />
        </li>
      {/if}
    {/each}
  </ul>
</section>
