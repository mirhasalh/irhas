<script lang="ts">
  import { page } from '$app/state'
  import PixelCanvas from '$components/PixelCanvas.svelte'
</script>

<div class="hero min-h-screen">
  <div class="hero-overlay-gradient-teal"></div>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="merriweather text-5xl font-bold">{page.status}</h1>
      <p class="py-6">
        {`${page.error?.message[0]}${page.error?.message.substring(1).toLowerCase()}`}
      </p>
    </div>
  </div>
  <PixelCanvas />
</div>
