<script lang="ts">
  import { onMount } from 'svelte'
  import type { LayoutData } from './$types'
  import { avatar } from '$lib/shared.svelte'
  import Meta from '$lib/components/Meta.svelte'
  import Posts from '$lib/components/Posts.svelte'
  import RecentWork from '$lib/components/RecentWork.svelte'
  import RiveAvatars from '$lib/components/RiveAvatars.svelte'
  import Tweet from '$lib/components/Tweet.svelte'

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  onMount(() => {
    document.body.classList.remove('bg-100')
    document.body.classList.add('bg-200')
  })
</script>

<Meta />
<section>
  <div class={`hero animated-fade-in`}>
    <RiveAvatars />
    <div class={`greetings`}>
      <h1 class={`shrink`}>
        Hello there
        <span class={`wave`}>👋</span>
      </h1>
      <p class={`shrink`}>
        I'm Irhas, welcome to my site.
        <br />
        <span class={`hobby`} class:reveal={avatar.hover}> I like drawing, btw. 🤫 </span>
      </p>
    </div>
  </div>
</section>
<section class={`h-paddings mb`}>
  <Posts {posts} />
</section>
<section class={`h-paddings`}>
  <RecentWork />
</section>
<section>
  <Tweet />
</section>
