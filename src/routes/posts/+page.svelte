<script lang="ts">
  import PostCard from '$components/PostCard.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  let selectedCategory = $state('')

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[],
    categories = [...new Set(posts.map((v) => v.categories).flat())]
</script>

<section class="max-w-4xl mx-auto min-h-screen">
  <h2 class="merriweather text-4xl mx-4 mt-4 font-bold">Recent posts</h2>
  <form class="filter m-4">
    <input class="btn btn-square" type="reset" value="×" />
    {#each categories as c}
      <input class="btn" type="radio" bind:group={selectedCategory} name="frameworks" aria-label={c} value={c} />
    {/each}
  </form>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each posts as post (post.slug)}
      {@const show = !selectedCategory ? true : post.categories.includes(selectedCategory)}
      {#if show}
        <li><PostCard {post} /></li>
      {/if}
    {/each}
  </ul>
</section>
