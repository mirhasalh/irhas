<script lang="ts">
  import { formatDate, website } from '$lib'

  let { post }: { post: App.Post } = $props()
</script>

<a id={`post-card`} class={`card bg-base-100 shadow-sm hover:bg-base-200`} href={`/post/${post.slug}`}>
  <figure>
    {#if post.videoUrl}
      <video width="100%" autoplay loop muted playsinline>
        <source src={post.videoUrl} type="video/mp4" />
        <track src="" kind="captions" srclang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    {:else if post.imageUrl}
      <img src={post.imageUrl} alt={post.title} width="100%" />
    {:else}
      <img src={`${website}/og-image.jpg`} alt={post.title} width="100%" />
    {/if}
  </figure>
  <div class={`card-body`}>
    <span class={`uppercase text-base-content/50`}><strong>{post.categories[0]}</strong></span>
    <h2 id={`post-title`} class={`merriweather card-title`}>{post.title}</h2>
    <p><span id={`post-excerpt`}>{post.excerpt}</span></p>
    <span class={`font-medium text-base-content/70`}>{formatDate(post.publishedAt)}</span>
  </div>
</a>
