<script lang="ts">
  import { website } from '$lib'
  import type { PageData } from './$types'

  const note = `Thanks for trying out this app before it's released! 🙏`

  let { data }: { data: PageData } = $props()

  const requestInternalTesting = () => {
    const email = prompt('Enter your email to request access to the closed testing:')

    if (email) {
      const subject = encodeURIComponent('Request to join closed-testing')
      const body = encodeURIComponent(`Hello,\n\nI would like to join the closed testing for your app.\n\nMy email: ${email}\n\nThanks!`)
      const mailtoLink = `mailto:irhasm@icloud.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink
    }
  }
</script>

<svelte:head>
  <title>{`${data.app!.name} (${data.app!.year})`}</title>
  <meta name="description" content={data.app!.shortDescription} />
  <meta property="og:title" content={`${data.app!.name} (${data.app!.year})`} />
  <meta property="og:description" content={data.app!.description} />
  <meta property="og:image" content={data.app!.featureGraphic} />
  <meta property="og:url" content={`${website}/app/${data.slug}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.app!.name} />
  <meta name="twitter:description" content={data.app!.description} />
  <meta name="twitter:image" content={data.app!.featureGraphic} />
  <link rel="canonical" href={`${website}/app/${data.slug}`} />
</svelte:head>

<div class="hero min-h-screen">
  <div class="hero-pattern-neutral-content"></div>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <img class="app-icon mx-auto mb-4" src={data.app!.icon} alt={data.app!.name} width="126" />
      {#if data.app!.isTesting}
        <div class="grid gap-4">
          <button class="btn" onclick={() => requestInternalTesting()}>
            <span>Join closed-testing</span>
          </button>
          <p><small>{note}</small></p>
        </div>
      {:else}
        <div class="flex gap-2 mt-4">
          {#if data.app!.ios}
            <a class="btn" href={data.app!.ios} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
              <span>AppStore</span>
            </a>
          {/if}
          {#if data.app!.android}
            <a class="btn" href={data.app!.android} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
              <span>GooglePlay</span>
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<section class="max-w-4xl mx-auto">
  <h2 id="feature-graphic" class="merriweather text-4xl m-4 font-bold">Feature graphic</h2>
  <figure class="post-card-graphic overflow-clip lg:rounded-lg">
    <img src={data.app!.featureGraphic} alt={data.app!.name} width="100%" />
    <figcaption class="hidden">{data.app!.shortDescription}</figcaption>
  </figure>
</section>
<section class="max-w-4xl mx-auto mt-10">
  <h2 id="description" class="merriweather text-4xl m-4 font-bold">Description</h2>
  <p class="px-4">{data.app!.description}</p>
</section>
<section class="max-w-4xl mx-auto mt-10">
  <h2 id="privacy" class="merriweather text-4xl m-4 font-bold">Privacy policy</h2>
  <p class="px-4">Effective date: {data.app!.privacy.effectiveDate}</p>
  <ol class="privacy-policy-list list mt-4 px-4">
    {#each data.app!.privacy.declarations as d, i (d.id)}
      <li>
        <p>
          <strong>{i + 1}. {d.title}</strong>
          <br />
          {d.subtitle}
        </p>
      </li>
    {/each}
  </ol>
</section>
