<script lang="ts">
  import '../styles/app.css'
  import { onMount } from 'svelte'
  import AppBar from '$lib/components/AppBar.svelte'
  import Logo from '$lib/components/Logo.svelte'
  import { initFadeInAnimation } from '$lib'

  const d = new Date()

  let { children } = $props()

  let year = d.getFullYear()

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
