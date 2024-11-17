<script lang="ts">
  import '../styles/app.css'
  import AppBar from '$lib/components/AppBar.svelte'
  import Logo from '$lib/components/Logo.svelte'

  const d = new Date()

  let { children } = $props()

  let year = d.getFullYear()
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
