<script lang="ts">
  import { page } from '$app/state'
</script>

<section>
  <div class={`hero`}>
    <h1>{page.status}: {page?.error?.message}</h1>
  </div>
</section>
