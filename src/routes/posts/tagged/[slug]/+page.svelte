<script lang="ts">
  import type { PageData } from './$types'
  import PostCard from '$components/PostCard.svelte'

  let { data }: { data: PageData } = $props(),
    find = $derived(data.slug),
    toFind = $derived(find.replace(/\s+/g, '').toLowerCase())

  const obj: any = $derived(data as any),
    posts: App.Post[] = $derived(obj.posts as App.Post[]),
    sortedPosts = $derived(posts.filter((post) => post.publishedAt).sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()))

  const goFind = async (find = '') => window.open(`/posts/tagged/${find}`, '_blank')

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (toFind) {
        goFind(toFind)
      } else {
        goFind('flutter')
      }
    }
  }
</script>

<svelte:head>
  <title>Tag: {data.slug}</title>
</svelte:head>

<section class="mx-auto min-h-screen max-w-4xl">
  <form class="m-4" onsubmit={() => goFind(toFind)}>
    <label class="input mx-auto" for="search">
      <span class="label">Search</span>
      <input name="search" type="text" placeholder="Tag" bind:value={find} onkeypress={onKeyPress} />
    </label>
  </form>
  {#if sortedPosts.length}
    <ul class="recent-posts-grid grid gap-4 px-4 md:grid-cols-2">
      {#each sortedPosts as post (post.id)}
        <li><PostCard {post} /></li>
      {/each}
    </ul>
  {:else}
    <ul class="px-4">
      <li>Posts? Nah</li>
    </ul>
  {/if}
</section>
