<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { website, initFadeInAnimation } from '$lib'
  import { HomePageState } from '../../state.svelte'
  import type { PageData } from './$types'
  import AppStore from '$lib/svg/AppStore.svelte'
  import GooglePlay from '$lib/svg/GooglePlay.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new HomePageState()

  if (browser) {
    pageState.setReadingMode(false)
  }

  const requestInternalTesting = () => {
    const email = prompt('Enter your email to request access to the closed testing:')

    if (email) {
      const subject = encodeURIComponent('Request to join closed-testing')
      const body = encodeURIComponent(`Hello,\n\nI would like to join the closed testing for your app.\n\nMy email: ${email}\n\nThanks!`)
      const mailtoLink = `mailto:irhasm@icloud.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink
    }
  }

  onMount(() => initFadeInAnimation())
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

<section>
  <div class={`hero animated-fade-in`}>
    <div class={`flex-center flex-col`}>
      <h1>{data.app!.name}</h1>
      <figure>
        <img class={`app-icon`} src={data.app!.icon} alt={data.app!.name} width="126" />
      </figure>
      <hr class={`md transparent`} />
      {#if data.app!.isTesting}
        <button class="btn" onclick={() => requestInternalTesting()}>
          <span>Join internal testing</span>
        </button>
      {:else}
        <div class={`flex-center gap`}>
          {#if data.app!.ios}
            <a href={data.app!.ios} target="_blank"><AppStore /></a>
          {/if}
          {#if data.app!.android}
            <a href={data.app!.android} target="_blank"><GooglePlay /></a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>
<section>
  <h2 class={`animated-fade-in`} id={`feature-graphic`}>Feature graphic</h2>
  <img class={`animated-fade-in`} src={data.app!.featureGraphic} alt={data.app!.name} width="100%" />
</section>
<section class={`px mb`}>
  <h2 class={`animated-fade-in`} id={`description`}>Description</h2>
  <p class={`animated-fade-in`}>{data.app!.description}</p>
</section>
<section class={`px mb`}>
  <h2 class={`animated-fade-in`} id={`privacy`}>Privacy Policy</h2>
  <p class={`animated-fade-in`}>Effective Date: {data.app!.privacy.effectiveDate}</p>
  <ol class={`list`}>
    {#each data.app!.privacy.declarations as d, i}
      <li class={`list-item animated-fade-in`}><strong>{i + 1}. {d.title}</strong><br />{d.subtitle}</li>
    {/each}
  </ol>
</section>
