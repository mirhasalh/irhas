<script lang="ts">
  import Accounts from './Accounts.svelte'
  import AnimatedMenuIcon from './AnimatedMenuIcon.svelte'
  import Logo from './Logo.svelte'

  const routes = ['Home', 'About-me', 'Posts']

  let detailsEl: HTMLDetailsElement,
    open = $state(false)

  const onToggle = () => (open = detailsEl?.open || false)
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
            {@const link = route === 'Home' ? '/' : `/${route.toLowerCase()}`}
            <li><a href={link} class={`link`}><small>{route}</small></a></li>
          {/each}
        </ul>
      </details>
      <a href="/">
        <Logo width={36} height={36} />
      </a>
    </div>
    <nav>
      {#each routes as route}
        {@const link = route === 'Home' ? '/' : `/${route.toLowerCase()}`}
        <a class={`link btn sm ghost`} href={link}><small>{route}</small></a>
      {/each}
    </nav>
    <div class={`app-bar-actions`}>
      <Accounts />
    </div>
  </div>
</header>
