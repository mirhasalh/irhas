<script lang="ts">
  import '../styles/app.css'
  import { browser } from '$app/environment'
  import { onNavigate } from '$app/navigation'
  import AppBar from '$lib/components/AppBar.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { LayoutPageState } from './state.svelte'

  let { children } = $props(),
    pageState = new LayoutPageState()

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

<svelte:head>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</svelte:head>

<AppBar />
{@render children()}
<Footer />
