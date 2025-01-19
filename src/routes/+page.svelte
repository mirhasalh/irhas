<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import type { LayoutData } from './$types'
  import { initFadeInAnimation, recentWork } from '$lib'
  import { avatar } from '$lib/shared.svelte'
  import Meta from '$lib/components/Meta.svelte'
  import Post from '$lib/components/Post.svelte'
  import RiveAvatars from '$lib/components/RiveAvatars.svelte'

  let { data }: { data: LayoutData } = $props(),
    selectedCategory = $state('all'),
    isIos = false,
    isSafari = false

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[],
    categories = Array.from(new Set(posts.flatMap((post) => post.categories || [])))

  const determineIsIos = () => {
    const userAgent: string = navigator.userAgent || (window as any).opera
    isIos = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  }

  if (browser) determineIsIos()

  const getLink = (id = 0, urls: string[]): string => {
    // To conditionally refer to a URL depending on the target platform (iOS or Android),
    // I have prepared index 0 for iOS and index 1 for Android.
    if (id === 4) {
      return isIos || isSafari ? urls[0] : urls[1]
    } else {
      return urls[0]
    }
  }

  $effect(() => {
    if (selectedCategory) initFadeInAnimation()
  })

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
  <h1 class={`animated-fade-in`}>Latest posts</h1>
  <div class={`flex-wrap animated-fade-in`}>
    <label class={`choice-chip`} for={`all`}>
      <input type="radio" id={`all`} name={`all`} value={`all`} bind:group={selectedCategory} />
      <small>All</small>
    </label>
    {#each categories as category}
      <label class={`choice-chip`} for={category}>
        <input type="radio" id={category} name={category} value={category} bind:group={selectedCategory} />
        <small>{category}</small>
      </label>
    {/each}
  </div>
  <hr class={`md transparent`} />
  <ul class={`list`}>
    {#each posts as post}
      {@const link = `/post/${post.slug}`}
      {#if selectedCategory === 'all' ? true : post.categories.includes(selectedCategory)}
        <li role={`listitem`} class={`list-item post animated-fade-in`}>
          <Post {post} {link} />
        </li>
      {/if}
    {/each}
  </ul>
  <div class={`flex-center pt`}>
    <a href="/posts" class={`btn link animated-fade-in`}>View all</a>
  </div>
</section>
<section class={`px`}>
  <h1 class={`animated-fade-in`}>Recent work</h1>
  <ul class={`recent-work-grid`}>
    {#each recentWork as w}
      <li role={`listitem`} class={`list-item work animated-fade-in`}>
        <a class={`link hover`} href={getLink(w.id, w.urls)} target="_blank">
          <div class={`work-info`}>
            <h4 class={`work-title`}>{`${w.title} (${w.year})`}</h4>
            <p class={`work-description`}>
              <small>{w.desc}</small>
            </p>
          </div>
          <figure>
            <img class={`cover`} src={w.imgUrl} alt={w.title} />
            <figcaption class={`work-caption`}>
              <small>{w.desc}</small>
            </figcaption>
          </figure>
        </a>
      </li>
    {/each}
  </ul>
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
