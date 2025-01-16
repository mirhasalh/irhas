<script lang="ts">
  import { page } from '$app/state'
  import { app } from '$lib/shared.svelte'
  import Dark from '$lib/icons/Dark.svelte'
  import Light from '$lib/icons/Light.svelte'
  import Accounts from './Accounts.svelte'
  import AnimatedMenuIcon from './AnimatedMenuIcon.svelte'
  import Logo from './Logo.svelte'
  import { LayoutPageState } from '../../routes/state.svelte'

  const routes = ['/', '/posts', '/about']

  let pageState = new LayoutPageState(),
    detailsEl: HTMLDetailsElement,
    open = $state(false),
    id = $derived.by(() => {
      return page.route.id
    }),
    to = $derived(app.theme === 'light' ? 'dark' : 'light')

  const onToggle = () => (open = detailsEl?.open || false),
    getName = (route = '') => {
      switch (route) {
        case '/':
          return 'Home'
        case '/about':
          return 'About'
        case '/posts':
          return 'Blog'
        default:
          return 'n/a'
      }
    }
</script>

<header class={`app-bar glass`}>
  <div class={`app-bar-contraint`}>
    <div class={`app-bar-leading`}>
      <details class={`dropdown`} bind:this={detailsEl} ontoggle={onToggle}>
        <summary class={`btn ghost sm squared`}>
          <AnimatedMenuIcon active={open} />
        </summary>
        <ul class={`menu dropdown-content`}>
          {#each routes as route}
            {@const name = getName(route)}
            {@const active = id === route}
            <li><a href={route} class={`link`} class:active><small>{name}</small></a></li>
          {/each}
        </ul>
      </details>
      <a href="/">
        <Logo width={36} height={36} />
      </a>
    </div>
    <div class={`center`}>
      <nav>
        {#each routes as route}
          {@const name = getName(route)}
          {@const active = id === route}
          <a class={`link btn sm ghost`} class:active href={route}><small>{name}</small></a>
        {/each}
      </nav>
    </div>
    <div class={`app-bar-actions`}>
      <button class={`btn sm squared`} onclick={() => pageState.setTheme(to)}>
        {#if app.theme === 'light'}
          <Light />
        {:else}
          <Dark />
        {/if}
      </button>
      <Accounts />
    </div>
  </div>
</header>
