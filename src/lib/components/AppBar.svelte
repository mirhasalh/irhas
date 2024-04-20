<script>
  import BrandLogo from '$components/BrandLogo.svelte'

  $: y = 0
</script>

<svelte:window bind:scrollY={y} />

<header class={`app-bar`} class:elevated={y > 60}>
  <div class={`leading`}>
    <div class={`brand`}>
      <button type="button">
        <BrandLogo width={40} />
      </button>
    </div>
  </div>
  <div class={`title home-url`}>
    <a href="https://www.irhas.lol/">Welcome 👋</a>
  </div>
</header>
