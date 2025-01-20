<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import { initFadeInAnimation } from '$lib'
  import Post from '$lib/components/Post.svelte'
  import Search from '$lib/icons/Search.svelte'

  let { data }: { data: PageData } = $props(),
    find = $state(data.slug),
    toFind = $derived(find.replace(/\s+/g, '').toLowerCase())

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  const goFind = async (find = '') => window.open(`/posts/tagged/${find}`, '_blank')

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') goFind(toFind)
  }

  onMount(() => {
    initFadeInAnimation()
    document.body.classList.remove('bg-100')
    document.body.classList.add('bg-200')
  })
</script>

<section class={`px pt mb`}>
  <form onsubmit={() => goFind(toFind)}>
    <label class={`input mx-auto`}>
      <span class={`label-icon`}><Search /></span>
      <input type="text" placeholder="Tag" bind:value={find} onkeypress={onKeyPress} />
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
