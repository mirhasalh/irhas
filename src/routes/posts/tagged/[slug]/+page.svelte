<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import { browser } from '$app/environment'
  import { HomePageState } from '../../../state.svelte'
  import { initFadeInAnimation } from '$lib'
  import Post from '$lib/components/Post.svelte'
  import Search from '$lib/icons/Search.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new HomePageState(),
    find = $state(data.slug),
    toFind = $derived(find.replace(/\s+/g, '').toLowerCase())

  if (browser) pageState.setReadingMode(false)

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  const goFind = async (find = '') => window.open(`/posts/tagged/${find}`, '_blank')

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') goFind(toFind)
  }

  onMount(() => initFadeInAnimation())
</script>

<section class={`px pt mb`}>
  <form onsubmit={() => goFind(toFind)}>
    <label class={`input mx-auto`}>
      <span class={`label-icon`}><Search /></span>
      <input type="search" placeholder="Tag" bind:value={find} onkeypress={onKeyPress} />
    </label>
  </form>
</section>
<section class={`px`}>
  {#if posts.length}
    <ul class={`list`}>
      {#each posts as post}
        {@const link = `/post/${post.slug}`}
        <li role={`listitem`} class={`list-item post animated-fade-in`}>
          <Post {post} {link} />
        </li>
      {/each}
    </ul>
  {:else}
    <div class={`hero-60`}>
      <p class={`text-center animated-fade-in`}>Posts? Nah</p>
    </div>
  {/if}
</section>
