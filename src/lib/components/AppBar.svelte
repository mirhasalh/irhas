<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { isMobile } from '$stores/isMobile'
  import BrandLogo from '$components/BrandLogo.svelte'

  const getTitle = (str: string) => {
    const split = str.split('-')
    const title = split.join(' ')
    return `${title[0].toUpperCase()}${title.slice(1)}`
  }

  let path = ''

  $: y = 0
  $: innerWidth = 0
  $: title = (route: string) => {
    if (route === '/') return ''
    const split = route.split('/')
    path = split[1]
    if (path === 'post') {
      return `${getTitle($page.params.slug)}`
    } else {
      return `${path[0].toUpperCase()}${path.slice(1)}`
    }
  }
</script>

<svelte:window bind:scrollY={y} bind:innerWidth />

<header class={`app-bar`} class:elevated={y > 60} class:sm={$isMobile}>
  <div class={`leading`}>
    <div class={`brand`}>
      <button type="button" on:click={() => goto('/')}>
        <BrandLogo width={40} />
      </button>
    </div>
  </div>
  <div class={`title`}>
    {#if path === 'post'}
      {#if y > 100}
        <a class:pinned={y > 120} href="https://www.irhas.lol/">{title(`${$page.route.id}`)}</a>
      {:else}
        <div />
      {/if}
    {:else}
      <a href="https://www.irhas.lol/">{title(`${$page.route.id}`)}</a>
    {/if}
  </div>
  <div class={`actions`}>
    <slot name="actions" />
  </div>
  <div />
</header>
