<script lang="ts">
  import { reveal, setDefaultOptions } from 'svelte-reveal'
  import { formatDate, website } from '$lib'

  let { post }: { post: App.Post } = $props()

  setDefaultOptions({
    easing: 'easeOutCubic',
    duration: 500
  })
</script>

<a class="post-card card bg-base-100 shadow-sm hover:bg-base-200" href={`/post/${post.slug}`}>
  <figure class="post-card-graphic">
    {#if post.videoUrl}
      <video width="100%" autoplay loop muted playsinline use:reveal={{ preset: 'blur' }}>
        <source src={post.videoUrl} type="video/mp4" />
        <track src="" kind="captions" srclang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    {:else if post.imageUrl}
      <img src={post.imageUrl} alt={post.title} width="100%" use:reveal={{ preset: 'blur' }} />
    {:else}
      <img src={`${website}/og-image.jpg`} alt={post.title} width="100%" use:reveal={{ preset: 'blur' }} />
    {/if}
  </figure>
  <div class="card-body" use:reveal={{ preset: 'blur' }}>
    <span class="uppercase text-base-content/50"><strong>{post.categories[0]}</strong></span>
    <h2 id={post.slug} class="post-card-title merriweather card-title">{post.title}</h2>
    <p><span class="post-card-excerpt">{post.excerpt}</span></p>
    <small class="jetbrains-mono font-medium text-base-content/70">{formatDate(post.publishedAt)}</small>
  </div>
</a>
