<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import { initFadeInAnimation } from '$lib'
  import Posts from '$lib/components/Posts.svelte'

  let { data }: { data: PageData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  onMount(() => {
    initFadeInAnimation()
    document.body.classList.remove('bg-100')
    document.body.classList.add('bg-200')
  })
</script>

<section class={`px mb pt`}>
  <Posts {posts} />
</section>
