<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { recentWork } from '$lib/info'

  let isIos = false,
    isSafari = false

  const determineIsIos = () => {
    if (browser) {
      const userAgent: string = navigator.userAgent || (window as any).opera
      isIos = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
      isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
    }
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

  onMount(() => determineIsIos())
</script>

<h1 class={`animated-fade-in`}>Recent work</h1>
<ul class={`list`}>
  {#each recentWork as w}
    <li role={`listitem`} class={`list-item animated-fade-in`}>
      <a class={`link`} href={getLink(w.id, w.urls)} target="_blank">
        {`${w.title} (${w.year})`}
        <figure>
          <img class={`cover`} src={w.imgUrl} alt={w.title} />
          <figcaption>
            <small>{w.desc}</small>
          </figcaption>
        </figure>
      </a>
    </li>
  {/each}
</ul>
