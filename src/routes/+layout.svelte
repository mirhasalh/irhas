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
    <div class="indicator hidden md:block">
      <span class="indicator-item status status-success animate-ping"></span>
      <div class="indicator-item status status-success"></div>
      <div class="tooltip tooltip-left tooltip-success" data-tip="Open to work">
        <a class="btn btn-ghost btn-circle overflow-clip" href="https://github.com/mirhasalh" target="_blank">
          <img src="https://github.com/mirhasalh.png" alt="mirhasalh" />
        </a>
      </div>
    </div>
  {/snippet}
</AppBar>
{@render children()}
<Footer />
