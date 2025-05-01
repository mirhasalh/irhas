<script lang="ts">
  import type { LayoutData } from './$types'
  import { website, formatDate, apps } from '$lib'
  import MetaHome from '$components/MetaHome.svelte'

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]
</script>

<MetaHome />

<div class={`hero min-h-screen`}>
  <div class={`hero-content text-center`}>
    <div class={`max-w-md`}>
      <h1 class={`text-5xl font-bold merriweather`}>Coming soon</h1>
      <p class={`py-6`}>Mini game will be placed here.</p>
    </div>
  </div>
</div>

<section class={`max-w-4xl mx-auto`}>
  <h2 id={`recent-posts`} class={`merriweather text-4xl m-4 font-bold`}>Recent posts</h2>
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
            <span class={`uppercase text-base-content/50`}><strong>{post.categories[0]}</strong></span>
            <h2 id={`post-title`} class={`merriweather card-title`}>{post.title}</h2>
            <p><span id={`post-excerpt`}>{post.excerpt}</span></p>
            <span class={`font-medium text-base-content/70`}>{formatDate(post.publishedAt)}</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<section class={`max-w-4xl mx-auto mt-10`}>
  <h2 id={`apps`} class={`merriweather text-4xl m-4 font-bold`}>Apps</h2>
  <ul id={`recent-posts-grid`} class={`grid gap-4 md:grid-cols-2 px-4`}>
    {#each apps as app}
      {@const url = `/app/${app.name.replace(' ', '-').toLowerCase()}`}
      <li>
        <a id={`post-card`} class={`card bg-base-100 shadow-sm hover:bg-base-200`} href={url}>
          <figure>
            <img src={app.featureGraphic} alt={app.name} width="100%" />
          </figure>
          <div class={`card-body`}>
            <span class={`uppercase text-base-content/50`}><strong>{app.year}</strong></span>
            <h2 id={`post-title`} class={`merriweather card-title`}>{app.name}</h2>
            <p><span id={`post-excerpt`}>{app.description}</span></p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
