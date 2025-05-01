<script lang="ts">
  import { formatDate, website } from '$lib'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]
</script>

<section class={`max-w-4xl mx-auto`}>
  <h2 class={`merriweather text-4xl m-4 font-bold`}>Recent posts</h2>
  <ul id={`recent-posts-grid`} class={`grid gap-4 md:grid-cols-2 px-4`}>
    {#each posts as post}
      {@const url = `/post/${post.slug}`}
      <li>
        <a id={`post-card`} class={`card bg-base-100 shadow-sm hover:bg-base-200`} href={url}>
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
            <strong>{post.categories[0]}</strong>
            <h2 id={`post-title`} class={`merriweather card-title`}>{post.title}</h2>
            <p>
              <span id={`post-excerpt`} class={`text-ellipsis`}>{post.excerpt}</span>
              <br />
              <small>{formatDate(post.publishedAt)}</small>
            </p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
