<script lang="ts">
  import type { PageData } from './$types'
  import { website } from '$lib'
  import { l } from '$lib/shared.svelte'
  import Tick from '$icons/Tick.svelte'
  import Card3D from '$components/Card3D.svelte'

  const gitHubAccounts = [
    {
      id: 0,
      username: 'irhsm',
      profile: 'https://github.com/irhsm',
      avatar: 'https://github.com/irhsm.png'
    },
    {
      id: 1,
      username: 'mirhas',
      profile: 'https://gitlab.com/mirhas',
      avatar: 'https://gitlab.com/uploads/-/system/user/avatar/12060869/avatar.png'
    },
    {
      id: 2,
      username: 'irhasalh',
      profile: 'https://github.com/irhasalh',
      avatar: 'https://github.com/irhasalh.png'
    },
    {
      id: 3,
      username: 'mirhasalh',
      profile: 'https://github.com/mirhasalh',
      avatar: 'https://github.com/mirhasalh.png'
    }
  ]

  let { data }: { data: PageData } = $props(),
    showImage = $state(false)

  const works = $derived(data.works.sort((a, b) => b.year - a.year))
</script>

<svelte:head>
  <title>{l('link.about')} | Irhas' dev blog</title>
  <meta name="description" content="Learn about Irhas, a self-taught software developer sharing practical coding tips, real-world project insights, and lessons learned in web development." />
  <meta name="keywords" content="Irhas, software developer, programming blog, web development, JavaScript, front-end, back-end, coding journey, self-taught developer, build in public" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href={`${website}/about`} />

  <meta property="og:title" content={`${l('link.about')} | Irhas' dev blog`} />
  <meta property="og:description" content="Learn about Irhas, a self-taught software developer sharing practical coding tips, real-world project insights, and lessons learned in web development." />
  <meta property="og:image" content={`${website}/og-image-logo.jpg`} />
  <meta property="og:url" content={`${website}/about`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${l('link.about')} | Irhas' dev blog`} />
  <meta name="twitter:description" content="Learn about Irhas, a self-taught software developer sharing practical coding tips, real-world project insights, and lessons learned in web development." />
  <meta name="twitter:image" content={`${website}/twitter-image-logo.jpg`} />
  <meta name="twitter:site" content="@irhasdev" />
</svelte:head>

<div class="hero min-h-screen">
  <div class="hero-pattern-primary"></div>
  <div class="hero-overlay-gradient-tertiary reveal-blur animation-delay-500"></div>
  <div class="hero-content relative z-10 max-w-3xl flex-col lg:flex-row-reverse">
    <Card3D />
    <div>
      <h1 id="greetings" class="merriweather text-5xl font-bold">
        {l('greetings2')}
      </h1>
      <p class="roboto py-6">{l('bio')}</p>
      <h2 id="github-accounts" class="merriweather text-4xl font-bold">
        {l('gitHubAccounts')}
      </h2>
      <p class="roboto py-4">{l('gitHubAccountsSubtitle')}</p>
      <div class="avatar-group -space-x-6">
        {#each gitHubAccounts as acc (acc.id)}
          <div class="avatar">
            <a class="w-12" href={acc.profile} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
              <img src={acc.avatar} alt={acc.username} />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<section class="mx-auto max-w-4xl">
  <div class="m-4 flex-wrap items-center justify-between md:flex">
    <h2 id="work-history" class="merriweather text-4xl font-bold">
      {l('workHistory')}
    </h2>
    <fieldset class="fieldset p-4">
      <legend class="fieldset-legend hidden">View options</legend>
      <label class="label">
        {l('showImage')}
        <input type="checkbox" bind:checked={showImage} class="toggle" />
      </label>
    </fieldset>
  </div>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical px-4">
    {#each works as work, i (work.id)}
      {@const isEven = i % 2 == 0}
      {@const textStyle = isEven ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'}
      <li>
        <div class="timeline-middle">
          <Tick />
        </div>
        <div class={textStyle}>
          <time class="jetbrains-mono italic">{work.year}</time>
          <div class="merriweather text-lg font-black">{work.title}</div>
          <img class:hidden={!showImage} src={`${website}/${work.imgFileName}`} alt={work.title} />
          <small class="roboto">{work.description}</small>
          <br />
          <a class="btn btn-sm mt-2" class:hidden={!showImage} href={work.urls[0]} target="_blank">
            <span class="roboto text-sm">{l('visit')}</span>
          </a>
        </div>
        {#if i !== works.length - 1}
          <hr />
        {/if}
      </li>
    {/each}
  </ul>
</section>

<section class="hero">
  <div class="hero-content">
    <a class="btn btn-neutral" href="https://irhas.site/Resume_20250124-081909.pdf" target="_parent">
      <span class="roboto">Resume</span>
    </a>
  </div>
</section>
