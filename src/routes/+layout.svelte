<script lang="ts">
  import '../styles/app.css'
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'
  import { initFadeInAnimation } from '$lib'
  import AppBar from '$lib/components/AppBar.svelte'
  import Footer from '$lib/components/Footer.svelte'

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

  onMount(() => initFadeInAnimation())
</script>

<AppBar />

{@render children()}

<Footer />
