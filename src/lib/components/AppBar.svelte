<script lang="ts">
  import { page } from '$app/state'
  import Accounts from './Accounts.svelte'
  import AnimatedMenuIcon from './AnimatedMenuIcon.svelte'
  import Logo from './Logo.svelte'
  import LightSwitch from './LightSwitch.svelte'

  const routes = ['/', '/posts', '/about']

  let detailsEl: HTMLDetailsElement,
    open = $state(false),
    id = $derived.by(() => {
      return page.route.id
    })

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
            <li><a href={route} class={`link hover`} class:active><small>{name}</small></a></li>
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
          <a class={`link hover btn sm ghost`} class:active href={route}><small>{name}</small></a>
        {/each}
      </nav>
    </div>
    <div class={`app-bar-actions`}>
      <LightSwitch />
      <Accounts />
    </div>
  </div>
</header>
