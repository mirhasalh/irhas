<script lang="ts">
  import { l } from '$lib/shared.svelte'

  let { image, key, rate, scopes }: { image: string; key: string; rate: string; scopes: string[] } = $props()
</script>

<div class="card bg-base-100 w-full shadow-sm sm:w-96">
  <figure>
    <img src={image} alt="Card Illustration" width="2800" height="1400" />
  </figure>
  <div class="card-body">
    <div class="flex justify-between">
      <h2 class="merriweather card-title text-start">{l(`${key}.title`)}</h2>
      <span class="jetbrains-mono text-end">{rate}</span>
    </div>
    <ul class="mt-6 flex flex-col gap-2 text-start text-sm">
      {#each scopes as scope}
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" class="text-success me-2 inline-block size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          <span>{l(`${key}.${scope}`)}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>
