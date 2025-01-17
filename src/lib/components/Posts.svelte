<script lang="ts">
  import { initFadeInAnimation } from '$lib'
  import Post from './Post.svelte'

  let { posts }: { posts: App.Post[] } = $props()

  let selectedCategory = $state('all')

  const categories = Array.from(new Set(posts.flatMap((post) => post.categories || [])))

  $effect(() => {
    if (selectedCategory) initFadeInAnimation()
  })
</script>

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
