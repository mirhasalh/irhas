<script lang="ts">
  import type { PageData } from './$types'
  import { formatDate, website } from '$lib'

  let { data }: { data: PageData } = $props(),
    find = $state(data.slug),
    toFind = $derived(find.replace(/\s+/g, '').toLowerCase())

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  const goFind = async (find = '') => window.open(`/posts/tagged/${find}`, '_blank')

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') goFind(toFind)
  }
</script>

<section class={`max-w-4xl mx-auto`}>
  <form class={`m-4`} onsubmit={() => goFind(toFind)}>
    <label class={`input mx-auto`} for="search">
      <span class="label">Search</span>
      <input name="search" type="text" placeholder="Tag" bind:value={find} onkeypress={onKeyPress} />
    </label>
  </form>
  {#if posts.length}
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
  {:else}
    <p>Posts? Nah</p>
  {/if}
</section>
