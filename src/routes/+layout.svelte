<script lang="ts">
  import '../styles/app.css'
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'
  import AppBar from '$lib/components/AppBar.svelte'
  import Logo from '$lib/components/Logo.svelte'
  import { initFadeInAnimation } from '$lib'

  const d = new Date()

  let { children } = $props()

  let year = d.getFullYear()

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  onMount(() => initFadeInAnimation())
</script>

<AppBar />

{@render children()}

<footer>
  <hr />
  <ul class={`list`}>
    <li class={`list-item`}>
      <a href="/">
        <Logo />
      </a>
    </li>
  </ul>
  <p><small>© {year} Irhas</small></p>
</footer>
