<script lang="ts">
  import { app } from '$lib/shared.svelte'
  import { LayoutPageState } from '../../routes/state.svelte'
  import Dark from '$lib/icons/Dark.svelte'
  import Light from '$lib/icons/Light.svelte'

  let pageState = new LayoutPageState()
  let to = $derived(app.theme === 'light' ? 'dark' : 'light')
</script>

<button class={`btn sm squared`} onclick={() => pageState.setTheme(to)}>
  {#if app.theme === 'light'}
    <Dark />
  {:else}
    <Light />
  {/if}
</button>
