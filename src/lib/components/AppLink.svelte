<script lang="ts">
  import { onMount } from 'svelte'
  // To conditionally refer to a URL depending on the target platform (iOS or Android),
  // I have prepared index 0 for iOS and index 1 for Android.
  let { text = '', urls = [] } = $props(),
    isIos = $state(false),
    isSafari = $state(false)

  const determineIsIos = () => {
    const userAgent: string = navigator.userAgent || (window as any).opera
    isIos = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  }

  onMount(() => determineIsIos())
</script>

{#if isIos || isSafari}
  <a class={`link`} href={urls[0]} target="_blank">{text}</a>
{:else}
  <a class={`link`} href={urls[1]} target="_blank">{text}</a>
{/if}
