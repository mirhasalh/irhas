<script lang="ts">
  import { browser } from '$app/environment'
  import DarkMode from '$icons/DarkMode.svelte'
  import LightMode from '$icons/LightMode.svelte'

  const colors = {
    light: {
      primary: '97, 53, 237',
      onPrimary: '#ffffff',
      primaryContainer: '#e6deff',
      onPrimaryContainer: '#1d0061',
      secondary: '#a14000',
      onSecondary: '#ffffff',
      secondaryContainer: '#ffdbcd',
      onSecondaryContainer: '#360f00',
      tertiary: '#006e1b',
      onTertiary: '#ffffff',
      tertiaryContainer: '#71ff75',
      onTertiaryContainer: '#002204',
      error: '#ba1a1a',
      onError: '#ffffff',
      errorContainer: '#ffdad6',
      onErrorContainer: '#410002',
      background: '#f5f5f7',
      onBackground: '#1c1b1e',
      surface: '#ffffff',
      onSurface: '#1c1b1e',
      outline: '#79757f',
      surfaceVariant: '#e6e0ec',
      onSurfaceVariant: '#48454e',
      backdrop: 'rgba(248, 246, 248, 0.8)',
      disabled: '#f6f6f6'
    },
    dark: {
      primary: '202, 190, 255',
      onPrimary: '#320099',
      primaryContainer: '#4900d5',
      onPrimaryContainer: '#e6deff',
      secondary: '#ffb597',
      onSecondary: '#591d00',
      secondaryContainer: '#7d2d00',
      onSecondaryContainer: '#ffdbcd',
      tertiary: '#4ae258',
      onTertiary: '#003909',
      tertiaryContainer: '#005312',
      onTertiaryContainer: '#71ff75',
      error: '#ffb4ab',
      onError: '#690005',
      errorContainer: '#93000a',
      onErrorContainer: '#ffdad6',
      background: '#1c1b1e',
      onBackground: '#ffffff',
      surface: '#252429',
      onSurface: '#ffffff',
      outline: '#938f99',
      surfaceVariant: '#48454e',
      onSurfaceVariant: '#e6e1e6',
      backdrop: 'rgba(19, 19, 20, 0.8)',
      disabled: '#2b2b2b'
    }
  }

  $: themeMode = browser ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 'light'

  const toggleTheme = () => (themeMode = themeMode === 'light' ? 'dark' : 'light')

  const onLightSwicth = () => {
    if (browser) {
      toggleTheme()
      const theme = themeMode === 'dark' ? colors.dark : colors.light
      const root = document.documentElement
      root.style.setProperty('--primary', theme.primary)
      root.style.setProperty('--on-primary', theme.onPrimary)
      root.style.setProperty('--primary-container', theme.primaryContainer)
      root.style.setProperty('--on-primary-container', theme.onPrimaryContainer)
      root.style.setProperty('--secondary', theme.secondary)
      root.style.setProperty('--on-secondary', theme.onSecondary)
      root.style.setProperty('--secondary-container', theme.secondaryContainer)
      root.style.setProperty('--on-secondary-container', theme.onSecondaryContainer)
      root.style.setProperty('--tertiary', theme.tertiary)
      root.style.setProperty('--on-tertiary', theme.onTertiary)
      root.style.setProperty('--tertiary-container', theme.tertiaryContainer)
      root.style.setProperty('--on-tertiary-container', theme.onTertiaryContainer)
      root.style.setProperty('--error', theme.error)
      root.style.setProperty('--on-error', theme.onError)
      root.style.setProperty('--error-container', theme.errorContainer)
      root.style.setProperty('--on-error-container', theme.onErrorContainer)
      root.style.setProperty('--background', theme.background)
      root.style.setProperty('--on-background', theme.onBackground)
      root.style.setProperty('--surface', theme.surface)
      root.style.setProperty('--on-surface', theme.onSurface)
      root.style.setProperty('--outline', theme.outline)
      root.style.setProperty('--surface-variant', theme.surfaceVariant)
      root.style.setProperty('--on-surface-variant', theme.onSurfaceVariant)
      root.style.setProperty('--backdrop', theme.backdrop)
      root.style.setProperty('--disabled', theme.disabled)
    }
  }
</script>

<button class={`raw icon`} role="switch" aria-label="Toggle Dark Mode" aria-checked={themeMode === 'dark'} type="button" on:click={onLightSwicth}>
  <DarkMode active={themeMode === 'light'} />
  <LightMode active={themeMode === 'dark'} />
</button>
