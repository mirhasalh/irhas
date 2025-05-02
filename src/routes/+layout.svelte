<script lang="ts">
  import '../app.css'
  import { browser } from '$app/environment'
  import { reveal } from 'svelte-reveal'
  import { onNavigate } from '$app/navigation'
  import { HomePageState } from './state.svelte'
  import { app } from '$lib/shared.svelte'
  import Footer from '$components/Footer.svelte'
  import BrandLogo from '$components/BrandLogo.svelte'
  import AppBar from '$components/AppBar.svelte'
  import LightSwitch from '$components/LightSwitch.svelte'

  let { children } = $props(),
    pageState = new HomePageState(),
    to = $derived(app.theme === 'light' ? 'dark' : 'light')

  const onChanged = () => pageState.setTheme(to)

  if (browser) pageState.setTheme()

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })
</script>

<AppBar>
  {#snippet leading()}
    <a href="/" class="flex items-center gap-2" use:reveal={{ preset: 'blur' }}>
      <BrandLogo width={40} height={40} />
      <p class="merriweather leading-4 text-sm">Irhas' dev<br />blog</p>
    </a>
  {/snippet}
  {#snippet trailing()}
    <LightSwitch isDark={app.theme === 'dark'} {onChanged} />
  {/snippet}
</AppBar>
{@render children()}
<Footer />
