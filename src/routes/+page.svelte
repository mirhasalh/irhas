<script lang="ts">
  import { onMount } from 'svelte'
  import type { LayoutData } from './$types'
  import { initFadeInAnimation } from '$lib'
  import { avatar } from '$lib/shared.svelte'
  import Meta from '$lib/components/Meta.svelte'
  import Posts from '$lib/components/Posts.svelte'
  import RecentWork from '$lib/components/RecentWork.svelte'
  import RiveAvatars from '$lib/components/RiveAvatars.svelte'

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  onMount(() => {
    initFadeInAnimation()
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
<section class={`px mb`}>
  <Posts {posts} />
</section>
<section class={`px`}>
  <RecentWork />
</section>
<section class={`px`}>
  <h1 class={`animated-fade-in`}>Tweet</h1>
  <div class={`flex-center animated-fade-in mb`}>
    <blockquote class={`twitter-tweet`}>
      <p lang="en" dir="ltr">To make PowerShell recognize a backslash (\), you need to double it (\\)</p>
      &mdash; IrhasDev (@irhasdev)<a href="https://twitter.com/irhasdev/status/1878710202670944462?ref_src=twsrc%5Etfw">January 13, 2025</a>
    </blockquote>
  </div>
</section>
