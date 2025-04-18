<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import type { LayoutData } from './$types'
  import { HomePageState } from './state.svelte'
  import { apps, initFadeInAnimation, recentWork } from '$lib'
  import { app } from '$lib/shared.svelte'
  import Meta from '$lib/components/Meta.svelte'
  import Post from '$lib/components/Post.svelte'
  import RiveAvatars from '$lib/components/RiveAvatars.svelte'

  let { data }: { data: LayoutData } = $props(),
    pageState = new HomePageState(),
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

  if (browser) {
    determineIsIos()
    pageState.setReadingMode(false)
  }

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

  onMount(() => initFadeInAnimation())
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
        <span class={`hobby`} class:reveal={app.avatarHovered}> I like drawing, btw. 🤫 </span>
      </p>
    </div>
  </div>
</section>
<section class={`px mb`}>
  <h1 id="apps" class={`animated-fade-in`}>Apps</h1>
  <ul class={`recent-work-grid`}>
    {#each apps as app}
      {@const link = `/app/${app.name.replace(' ', '-').toLowerCase()}`}
      <li role={`listitem`} class={`list-item work animated-fade-in`}>
        <a class={`link hover`} href={link}>
          <div class={`work-info`}>
            <h4 class={`work-title`}>{`${app.name} (${app.year})`}</h4>
            <p class={`work-description`}>
              <small>{app.description}</small>
            </p>
          </div>
          <figure>
            <img class={`cover`} src={app.featureGraphic} alt={app.name} width="126" />
            <figcaption class={`work-caption`}>
              <small>{app.description}</small>
            </figcaption>
          </figure>
        </a>
      </li>
    {/each}
  </ul>
</section>
<section class={`px mb`}>
  <h1 id="posts" class={`animated-fade-in`}>Latest posts</h1>
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
  <h1 id="work" class={`animated-fade-in`}>Recent work</h1>
  <ul class={`recent-work-grid`}>
    {#each recentWork as w}
      {@const link = getLink(w.id, w.urls)}
      <li role={`listitem`} class={`list-item work animated-fade-in`}>
        <a class={`link hover`} href={link} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
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
<section class={`px mb`}>
  <h1 id="tweet" class={`animated-fade-in`}>Tweet</h1>
  <div class={`flex-center animated-fade-in`} class:hidden={app.theme === 'dark'}>
    <blockquote class="twitter-tweet">
      <p lang="en" dir="ltr">
        Can&#39;t wait for <a href="https://twitter.com/daisyui_?ref_src=twsrc%5Etfw">@daisyui_</a> v5! I&#39;ll be rewriting all the styles for <a href="https://t.co/Ax4OZyZ7Hl">https://t.co/Ax4OZyZ7Hl</a> with it as soon as it&#39;s released
      </p>
      &mdash; IrhasDev (@irhasdev)<a href="https://twitter.com/irhasdev/status/1881552578217226372?ref_src=twsrc%5Etfw">January 21, 2025</a>
    </blockquote>
  </div>
  <div class={`flex-center animated-fade-in`} class:hidden={app.theme === 'light'}>
    <blockquote class="twitter-tweet" data-theme="dark">
      <p lang="en" dir="ltr">
        Can&#39;t wait for <a href="https://twitter.com/daisyui_?ref_src=twsrc%5Etfw">@daisyui_</a> v5! I&#39;ll be rewriting all the styles for <a href="https://t.co/Ax4OZyZ7Hl">https://t.co/Ax4OZyZ7Hl</a> with it as soon as it&#39;s released
      </p>
      &mdash; IrhasDev (@irhasdev)<a href="https://twitter.com/irhasdev/status/1881552578217226372?ref_src=twsrc%5Etfw">January 21, 2025</a>
    </blockquote>
  </div>
</section>
