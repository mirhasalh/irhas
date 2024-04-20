<script>
  import BrandLogo from '$components/BrandLogo.svelte'
</script>

<header class={`app-bar`}>
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
