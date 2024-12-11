<script lang="ts">
  import Accounts from './Accounts.svelte'
  import Logo from './Logo.svelte'
</script>

<header class={`app-bar glass`}>
  <div class={`app-bar-contraint`}>
    <nav>
      <a href="/">
        <Logo width={36} height={36} />
      </a>
    </nav>
    <div class={`app-bar-actions`}>
      <Accounts />
    </div>
  </div>
</header>
