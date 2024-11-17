<script lang="ts">
  import { formatDate } from '$lib'

  let { posts }: { posts: App.Post[] } = $props()
</script>

<h1>Latest posts</h1>
<ul class={`list`}>
  {#each posts as post}
    {@const href = `/post/${post.slug}`}
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
  {/each}
</ul>
