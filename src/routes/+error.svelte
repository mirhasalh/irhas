<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/state'
  import { HomePageState } from './state.svelte'
  import Planet from '$lib/svg/Planet.svelte'

  let pageState = new HomePageState()

  if (browser) pageState.setReadingMode(false)
</script>

<section>
  <div class={`hero`}>
    <div>
      <Planet />
      <p class={`text-center`}>{page.status}: {page?.error?.message}</p>
    </div>
  </div>
</section>
