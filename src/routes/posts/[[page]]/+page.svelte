<script>
  import { name } from '$lib/info.js'
  import Article from '$components/Article.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  $: isFirstPage = data.page === 1
  $: hasNextPage = data.posts[data.posts.length - 1]?.previous
</script>

<svelte:head>
  <title>{name} | Posts</title>
</svelte:head>

<section>
  {#each data.posts as post, i}
    <Article {post} />
    {#if i !== data.posts.length - 1}
      <hr class={`transparent`} />
    {/if}
  {/each}
</section>

<section class={`main-padding`}>
  {#if !isFirstPage}
    <a href={`/posts/${data.page - 1}`} data-sveltekit-prefetch> Previous </a>
  {:else}
    <div />
  {/if}

  {#if hasNextPage}
    <a href={`/posts/${data.page + 1}`} data-sveltekit-prefetch>Next </a>
  {/if}
</section>
