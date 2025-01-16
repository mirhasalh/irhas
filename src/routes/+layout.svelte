<script lang="ts">
  import '../styles/app.css'
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'
  import AppBar from '$lib/components/AppBar.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { app } from '$lib/shared.svelte'

  let { children } = $props()

  const setTheme = (to = '') => {
    if (to === 'light') {
      app.theme = 'light'
    } else if (to === 'dark') {
      app.theme = 'dark'
    } else {
      app.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    document.documentElement.setAttribute('data-theme', app.theme)
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  onMount(() => setTheme())
</script>

<AppBar />

{@render children()}

<Footer />
