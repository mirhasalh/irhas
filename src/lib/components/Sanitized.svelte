<script>
  import { browser } from '$app/environment'
  import DOMPurify from 'isomorphic-dompurify'

  export let html
</script>

{#if browser}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })}
{/if}
