<script lang="ts">
  import BrandLogo from './BrandLogo.svelte'
  import { email, sites, socials } from '$lib'
  import { app } from '$lib/shared.svelte'

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

<footer class="footer sm:footer-horizontal bg-base-300 text-base-content p-10 mt-10">
  <nav>
    <h6 class="footer-title">Sites</h6>
    {#each sites as site (site.url)}
      <a class="link link-hover" href={site.url} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        {site.name}
      </a>
    {/each}
  </nav>
  <nav>
    <h6 class="footer-title">Socials</h6>
    {#each socials as social (social.url)}
      <a class="link link-hover" href={social.url} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        {social.name}
      </a>
    {/each}
  </nav>
  <form onsubmit={sendEmail}>
    <h6 class="footer-title">Get in touch</h6>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Email me</legend>
      <div class="join">
        <input name="body" type="text" placeholder="Jot something down" class="input input-bordered join-item" bind:value={emailBody} />
        <button type="submit" class="btn btn-primary join-item" disabled={emailBody.length < 5}>
          <span>Send</span>
        </button>
      </div>
    </fieldset>
  </form>
</footer>
{#if app.theme == 'dark'}
  <hr class="border-neutral" />
{:else}
  <hr class="border-neutral-content" />
{/if}
<footer class="footer bg-base-300 text-base-content px-10 py-4">
  <aside>
    <a href="/"><BrandLogo /></a>
    <p>
      <span class="merriweather">Irhas' dev blog</span>
      <br />
      © {year}
    </p>
  </aside>
  <nav class="md:place-self-center md:justify-self-end">
    <div class="grid grid-flow-col gap-4">
      <a href="https://www.netlify.com">
        <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" alt="Deploys by Netlify" />
      </a>
    </div>
  </nav>
</footer>
