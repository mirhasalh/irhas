<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import { initFadeInAnimation } from '$lib'
  import Post from '$lib/components/Post.svelte'

  let { data }: { data: PageData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  onMount(() => {
    initFadeInAnimation()
    document.body.classList.remove('bg-100')
    document.body.classList.add('bg-200')
  })
</script>

<section class={`px pt`}>
  <h1 class={`text-center animated-fade-in`}>{`#${data.slug}`}</h1>
</section>
<section class={`px`}>
  <ul class={`list`}>
    {#each posts as post}
      {@const link = `/post/${post.slug}`}
      <li role={`listitem`} class={`list-item post animated-fade-in`}>
        <Post {post} {link} />
      </li>
    {/each}
  </ul>
</section>
