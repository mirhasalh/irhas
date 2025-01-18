<script lang="ts">
  import '../styles/app.css'
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'
  import AppBar from '$lib/components/AppBar.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { LayoutPageState } from './state.svelte'

  let pageState = new LayoutPageState()

  let { children } = $props()

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  onMount(() => pageState.setTheme())
</script>

<svelte:head>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</svelte:head>

<AppBar />
{@render children()}
<Footer />
