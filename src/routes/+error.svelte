<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/state'
  import { HomePageState } from './state.svelte'

  let pageState = new HomePageState()

  if (browser) pageState.setReadingMode(false)
</script>

<section>
  <div class={`hero`}>
    <h1>{page.status}: {page?.error?.message}</h1>
  </div>
</section>
