<script lang="ts">
  import type { LayoutData } from './$types'
  import { apps } from '$lib'
  import MetaHome from '$components/MetaHome.svelte'
  import PostCard from '$components/PostCard.svelte'

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]
</script>

<MetaHome />

<div class="hero min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold merriweather">Coming soon</h1>
      <p class="py-6">Mini game will be placed here.</p>
    </div>
  </div>
</div>

<section class="max-w-4xl mx-auto">
  <h2 id="recent-posts" class="merriweather text-4xl m-4 font-bold">Recent posts</h2>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each posts as post (post.slug)}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
</section>

<section class="max-w-4xl mx-auto mt-10">
  <h2 id="apps" class="merriweather text-4xl m-4 font-bold">Apps</h2>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each apps as app (app.id)}
      {@const url = `/app/${app.name.replace(' ', '-').toLowerCase()}`}
      <li>
        <a class="post-card card bg-base-100 shadow-sm hover:bg-base-200" href={url}>
          <figure>
            <img src={app.featureGraphic} alt={app.name} width="100%" />
          </figure>
          <div class="card-body">
            <span class="jetbrains-mono uppercase text-base-content/50"><strong>{app.year}</strong></span>
            <h2 class="merriweather card-title">{app.name}</h2>
            <p><span>{app.description}</span></p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
