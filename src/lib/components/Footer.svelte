<script lang="ts">
  import Logo from '$lib/components/Logo.svelte'
  import { socials } from '$lib/info'

  const d = new Date()
  let year = $state(d.getFullYear())
</script>

<footer class={`footer`}>
  <div>
    <a href="/">
      <Logo />
    </a>
    <p><small>© {year} Irhas</small></p>
  </div>
  <nav>
    <h5 class={`footer-title`}>Socials</h5>
    {#each socials as social}
      <a class={`link`} href={social.url} target="_blank">
        <small>{social.name}</small>
      </a>
    {/each}
  </nav>
</footer>
