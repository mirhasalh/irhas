<script lang="ts">
  import { reveal } from 'svelte-reveal'
  import PostCard from '$components/PostCard.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]
</script>

<section class="max-w-4xl mx-auto">
  <h2 class="merriweather text-4xl m-4 font-bold" use:reveal={{ preset: 'blur' }}>Recent posts</h2>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each posts as post (post.slug)}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
</section>
