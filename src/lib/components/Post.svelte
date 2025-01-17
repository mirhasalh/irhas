<script lang="ts">
  import { formatDate } from '$lib'

  let { post, link }: { post: App.Post; link: string } = $props()
</script>

<a href={link} aria-label={post.title}>
  <div class={`title-media`}>
    {#if post.videoUrl}
      <video width="100%" autoplay loop muted playsinline>
        <source src={post.videoUrl} type="video/mp4" />
        <track src="" kind="captions" srclang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    {:else if post.imageUrl}
      <img src={post.imageUrl} alt={post.title} width="100%" />
    {:else}
      <h6 class={`shrink text-center`}>No media</h6>
    {/if}
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
