<script>
  import { name } from '$lib/info.js'
  import { format, parseISO } from 'date-fns'

  /** @type {import('./$types').PageData} */
  export let data

  $: isFirstPage = data.page === 1
  $: hasNextPage = data.posts[data.posts.length - 1]?.previous
</script>

<svelte:head>
  <title>{name} | Posts</title>
</svelte:head>

<div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
  {#each data.posts as post}
    <article class="grid items-start grid-cols-4 gap-8">
      <time datetime={post.date}>
        {format(new Date(parseISO(post.date)), 'MMMM d, yyyy')}
      </time>
    </article>
  {/each}
</div>

<div>
  {#if !isFirstPage}
    <a href={`/posts/${data.page - 1}`} data-sveltekit-prefetch> Previous </a>
  {:else}
    <div />
  {/if}

  {#if hasNextPage}
    <a href={`/posts/${data.page + 1}`} data-sveltekit-prefetch>Next </a>
  {/if}
</div>
