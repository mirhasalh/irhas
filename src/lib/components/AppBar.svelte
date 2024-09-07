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
    if (route === '/') return 'Blog posts'
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
  <section class={`empty-area`}></section>
  <section class={`child`}>
    <div class={`leading`}>
      <div class={`brand`}>
        <button type="button" on:click={() => goto('/')}>
          <BrandLogo width={40} />
        </button>
      </div>
    </div>
    <div class={`title`}>
      <h3 class={`shrink`} class:pinned={y > 120}>{title(`${$page.route.id}`)}</h3>
    </div>
    <div class={`actions`}>
      <slot name="actions" />
    </div>
  </section>
  <section class={`empty-area`}></section>
</header>
