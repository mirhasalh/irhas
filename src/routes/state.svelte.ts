import { app } from "$lib/shared.svelte"

export class LayoutPageState {
  setTheme = (to = '') => {
    if (to === 'light') {
      app.theme = 'light'
    } else if (to === 'dark') {
      app.theme = 'dark'
    } else {
      app.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    document.documentElement.setAttribute('data-theme', app.theme)
  }
}