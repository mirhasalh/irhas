<script lang="ts">
  let { src, alt }: { src: string; alt: string } = $props()
</script>

<div class="hover-3d hidden xl:inline-grid">
  <figure class="rounded-xl">
    <img {src} {alt} />
  </figure>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<div class="max-w-md xl:hidden">
  <figure>
    <img class="rounded-xl" {src} {alt} />
  </figure>
</div>
