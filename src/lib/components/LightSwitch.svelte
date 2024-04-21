<script lang="ts">
  import { browser } from '$app/environment'
  import DarkMode from '$icons/DarkMode.svelte'
  import LightMode from '$icons/LightMode.svelte'

  const colors = {
    light: {
      primary: '#6135ed',
      secondary: '#a14000',
      background: '#f8f6f8',
      onBackground: '#131314',
      primaryContainer: '#f0f4f8',
      onPrimaryContainer: '#444746',
      hoverOnPrimaryContainer: 'rgba(68, 71, 70, 1.03)',
      backdrop: 'rgba(248, 246, 248, 0.8)'
    },
    dark: {
      primary: '#cabeff',
      secondary: '#ffb694',
      background: '#131314',
      onBackground: '#ffffff',
      primaryContainer: '#1e1f20',
      onPrimaryContainer: '#ffffff',
      hoverOnPrimaryContainer: 'rgba(255, 255, 255, 0.97)',
      backdrop: 'rgba(19, 19, 20, 0.8)'
    }
  }

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : false

  const onLightSwicth = () => {
    if (browser) {
      isDarkMode = !isDarkMode
      const theme = isDarkMode ? colors.dark : colors.light
      const root = document.documentElement
      root.style.setProperty('--primary', theme.primary)
      root.style.setProperty('--secondary', theme.secondary)
      root.style.setProperty('--background', theme.background)
      root.style.setProperty('--on-background', theme.onBackground)
      root.style.setProperty('--primary-container', theme.primaryContainer)
      root.style.setProperty('--on-primary-container', theme.onPrimaryContainer)
      root.style.setProperty('--hover-on-primary-container', theme.hoverOnPrimaryContainer)
      root.style.setProperty('--backdrop', theme.backdrop)
    }
  }
</script>

<button class={`raw icon`} role="switch" aria-label="Toggle Dark Mode" aria-checked={isDarkMode} type="button" on:click={onLightSwicth}>
  <DarkMode active={!isDarkMode} />
  <LightMode active={isDarkMode} />
</button>
