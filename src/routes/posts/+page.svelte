<script lang="ts">
  import { l } from '$lib/shared.svelte'
  import type { PageData } from './$types'
  import PostCard from '$components/PostCard.svelte'
  import { website } from '$lib'

  let { data }: { data: PageData } = $props()

  let selectedCategory = $state('')

  const obj: any = $derived(data as any),
    posts: App.Post[] = $derived(obj.posts as App.Post[]),
    categories = $derived([...new Set(posts.map((v) => v.category).flat())])

  let postsToShow = $derived.by(() => {
      return !selectedCategory ? posts : posts.filter((p) => p.category === selectedCategory)
    }),
    sortedPostsToShow = $derived(postsToShow.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()))
</script>

<svelte:head>
  <title>{l('link.posts')} | Irhas' dev blog</title>
  <meta name="description" content="Explore Irhas' collection of insightful blog posts covering web development, programming tips, and real-world project experiences. Stay updated with the latest in software development." />
  <meta name="keywords" content="Irhas, blog posts, web development, programming tips, software development, coding insights, real-world projects" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href={`${website}/posts`} />

  <meta property="og:title" content={`${l('link.posts')} | Irhas' dev blog`} />
  <meta property="og:description" content="Explore Irhas' collection of insightful blog posts covering web development, programming tips, and real-world project experiences. Stay updated with the latest in software development." />
  <meta property="og:image" content={`${website}/og-image-logo.jpg`} />
  <meta property="og:url" content={`${website}/posts`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${l('link.posts')} | Irhas' dev blog`} />
  <meta name="twitter:description" content="Explore Irhas' collection of insightful blog posts covering web development, programming tips, and real-world project experiences. Stay updated with the latest in software development." />
  <meta name="twitter:image" content={`${website}/twitter-image-logo.jpg`} />
  <meta name="twitter:site" content="@irhasdev" />
</svelte:head>

<section class="mx-auto min-h-screen max-w-4xl">
  <h2 class="merriweather mx-4 mt-4 text-4xl font-bold">
    {l('recentPosts')}
  </h2>
  <div class="w-full overflow-x-auto py-4">
    <div class="flex w-max">
      <form class="filter">
        <input class="btn btn-square" type="reset" value="×" />
        {#each categories as c}
          <input class="btn" type="radio" bind:group={selectedCategory} name="frameworks" aria-label={c} value={c} />
        {/each}
      </form>
    </div>
  </div>
  <ul class="recent-posts-grid grid gap-4 px-4 md:grid-cols-2">
    {#each sortedPostsToShow as post (post.id)}
      <li>
        <PostCard {post} />
      </li>
    {/each}
  </ul>
</section>
