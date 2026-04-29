<script lang="ts">
  import PricingCard from '$components/PricingCard.svelte'
  import { website } from '$lib'
  import { l } from '$lib/shared.svelte'

  const rateCards = [
    {
      image: `${website}/design_2800x1400.webp`,
      key: 'rateCards.uiUx',
      scopes: ['scopes.0', 'scopes.1', 'scopes.2', 'scopes.3']
    },
    {
      image: `${website}/macbook_2800x1400.webp`,
      key: 'rateCards.webDev',
      scopes: ['scopes.0', 'scopes.1', 'scopes.2']
    },
    {
      image: `${website}/dart_2800x1400.webp`,
      key: 'rateCards.webApp',
      scopes: ['scopes.0', 'scopes.1', 'scopes.2', 'scopes.3']
    },
    {
      image: `${website}/mobile_dev_2800x1400.webp`,
      key: 'rateCards.mobileApp',
      scopes: ['scopes.0', 'scopes.1', 'scopes.2', 'scopes.3']
    }
  ]

  const rateIDR = (min: number, max: number): string => {
    return `IDR ${min.toLocaleString('id-ID')} - ${max.toLocaleString('id-ID')}`
  }
</script>

<svelte:head>
  <title>{l('link.rateCard')} | Irhas' dev blog</title>
  <meta name="description" content="Discover Irhas' service rates for UI/UX design, web development, SaaS applications, and mobile app development. Transparent pricing for high-quality digital solutions." />
  <meta name="keywords" content="Irhas, service rates, UI/UX design, web development, SaaS applications, mobile app development, pricing, digital solutions" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href={`${website}/rate-card`} />

  <meta property="og:title" content={`${l('link.rateCard')} | Irhas' dev blog`} />
  <meta property="og:description" content="Discover Irhas' service rates for UI/UX design, web development, SaaS applications, and mobile app development. Transparent pricing for high-quality digital solutions." />
  <meta property="og:image" content={`${website}/og-image-logo.jpg`} />
  <meta property="og:url" content={`${website}/rate-card`} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${l('link.rateCard')} | Irhas' dev blog`} />
  <meta name="twitter:description" content="Discover Irhas' service rates for UI/UX design, web development, SaaS applications, and mobile app development. Transparent pricing for high-quality digital solutions." />
  <meta name="twitter:image" content={`${website}/twitter-image-logo.jpg`} />
  <meta name="twitter:site" content="@irhasdev" />
</svelte:head>

<div class="hero min-h-screen">
  <div class="hero-overlay-gradient-primary reveal-blur animation-delay-500"></div>
  <div class="hero-pattern-doodle"></div>
  <div class="hero-content relative z-10 text-center">
    <div class="max-w-4xl">
      <h1 id="animations" class="merriweather py-6 text-5xl font-bold">{l('link.rateCard')}</h1>
      <div class="flex flex-wrap justify-center gap-4 sm:gap-2">
        {#each rateCards as card}
          {@const min = Number(l(`${card.key}.priceIDR.min`))}
          {@const max = Number(l(`${card.key}.priceIDR.max`))}
          {@const rate = rateIDR(min, max)}
          <PricingCard image={card.image} key={card.key} {rate} scopes={card.scopes} />
        {/each}
      </div>
    </div>
  </div>
</div>
