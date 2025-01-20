import { app } from "$lib/shared.svelte"

export class HomePageState {
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

  setReadingMode = (enable: boolean) => {
    document.body.classList.remove(enable ? 'bg-200' : 'bg-100')
    document.body.classList.add(enable ? 'bg-100' : 'bg-200')
  }
}