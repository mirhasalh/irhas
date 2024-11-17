<script lang="ts">
  import { formatDate } from '$lib'

  let { posts }: { posts: App.Post[] } = $props()

  let selectedCategory = $state('all')

  const categories = Array.from(new Set(posts.flatMap((post) => post.categories || [])))
</script>

<h1>Latest posts</h1>
<div class={`flex-wrap`}>
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
    {@const href = `/post/${post.slug}`}
    {#if selectedCategory === 'all' ? true : post.categories.includes(selectedCategory)}
      <li role={`listitem`} class={`list-item post`}>
        <a {href} aria-label={post.title}>
          <div class={`title-media`}>
            <img src={post.imageUrl} alt={post.title} width="100%" />
          </div>
          <div class={`tile-description`}>
            <div class={`title-head`}>
              <h4 class={`shrink`}>{post.categories[0]}</h4>
              <h2 class={`shrink`}>{post.title}</h2>
            </div>
            <div class={`title-timestamp`}>
              <span><small>{formatDate(post.publishedAt)}</small></span>
            </div>
          </div>
        </a>
      </li>
    {/if}
  {/each}
</ul>
