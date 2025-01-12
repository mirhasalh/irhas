<script lang="ts">
  import Logo from '$lib/components/Logo.svelte'
  import { email, sites, socials } from '$lib/info'

  const d = new Date()

  let year = $state(d.getFullYear()),
    emailBody = $state('')

  const sendEmail = (event: Event) => {
    event.preventDefault()
    const subject = 'Contact form submission'
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
  }
</script>

<footer class={`footer`}>
  <div class={`footer-logo`}>
    <a href="/">
      <Logo />
    </a>
    <p><small>© {year} Irhas</small></p>
  </div>
  <nav>
    <h5 class={`footer-title`}>Sites</h5>
    {#each sites as site}
      <a class={`link`} href={site.url} target="_blank">
        <small>{site.name}</small>
      </a>
    {/each}
  </nav>
  <nav>
    <h5 class={`footer-title`}>Socials</h5>
    {#each socials as social}
      <a class={`link`} href={social.url} target="_blank">
        <small>{social.name}</small>
      </a>
    {/each}
  </nav>
  <form class={`form`} onsubmit={sendEmail}>
    <h5 class={`footer-title`}>Email me</h5>
    <textarea class={`textarea`} name="body" id="body" placeholder="Jot something down" bind:value={emailBody}></textarea>
    <div class={`actions`}>
      <button type="submit" class={`btn`} disabled={emailBody.length < 5}>Send</button>
    </div>
  </form>
</footer>
