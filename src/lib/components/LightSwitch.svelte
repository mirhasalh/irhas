<script lang="ts">
  import { app } from '$lib/shared.svelte'
  import { LayoutPageState } from '../../routes/state.svelte'
  import DarkMode from '$lib/icons/DarkMode.svelte'
  import LightMode from '$lib/icons/LightMode.svelte'

  let pageState = new LayoutPageState()
  let to = $derived(app.theme === 'light' ? 'dark' : 'light')
</script>

<button class={`btn sm squared`} onclick={() => pageState.setTheme(to)}>
  {#if app.theme === 'light'}
    <DarkMode />
  {:else}
    <LightMode />
  {/if}
</button>
