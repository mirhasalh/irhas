<script lang="ts">
  import { onMount } from 'svelte'
  import '../styles/app.scss'
  import { browser } from '$app/environment'
  import { github } from '$lib/info.js'
  import debounce from 'lodash/debounce'
  import AppBar from '$components/AppBar.svelte'
  import { isMobile } from '$stores/isMobile'
  import UnderConstructionIndicator from '$components/UnderConstructionIndicator.svelte'
  import GitHub from '$lib/icons/GitHub.svelte'
  import LinkedIn from '$lib/icons/LinkedIn.svelte'
  import Flutter from '$lib/icons/Flutter.svelte'
  import LightSwitch from '$components/LightSwitch.svelte'
  import BrandLogo from '$components/BrandLogo.svelte'

  const d = new Date()

  let isUnderConstruction = true,
    year = d.getFullYear()

  const getIsMobile = () => (innerWidth <= 1024 ? isMobile.set(true) : isMobile.set(false))

  const onSocial = (to: string) => {
    if (!browser) return
    switch (to) {
      case 'flutter':
        window.open('https://flutter.irhas.lol/', '_blank')
        break
      case 'github':
        window.open('https://github.com/' + github, '_blank')
        break
      case 'linkedin':
        window.open('https://www.linkedin.com/in/irhasdev/', '_blank')
        break
      default:
        window.open('/', '_self')
        break
    }
  }

  const onResize = debounce(() => {
    if (browser) getIsMobile()
  }, 300)

  onMount(() => getIsMobile())
</script>

<svelte:window on:resize={onResize} />

{#if isUnderConstruction}
  <div class={`under-construction-wrapper`}>
    <UnderConstructionIndicator />
    <div class={`caption`}><small>This Irhas's site is currently<br />under construction!</small></div>
    <button class={`primary rounded`} type="button" on:click={() => (isUnderConstruction = false)}><strong>Proceed anyway</strong></button>
    <div class={`socials`}>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('flutter')}><Flutter /></button>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('github')}><GitHub /></button>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('linkedin')}><LinkedIn /></button>
    </div>
  </div>
{/if}
<AppBar>
  <svelte:fragment slot="actions">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
<div class={`app-shell`} class:sm={$isMobile}>
  <section></section>
  <main><slot /></main>
  <section></section>
</div>
<footer>
  <div class={`bottom-profile`} class:sm={$isMobile}>
    <BrandLogo color={`white`} />
    <div class={`socials`}>
      <button type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('flutter')}><Flutter /></button>
      <button type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('github')}><GitHub /></button>
      <button type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('linkedin')}><LinkedIn /></button>
    </div>
  </div>
  <hr />
  <p><small>© {year} Irhas A.</small></p>
</footer>
