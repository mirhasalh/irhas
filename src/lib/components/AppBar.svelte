<script lang="ts">
  import { accounts, github } from '$lib'
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
      <nav>
        {#each accounts as account}
          {@const url = `${github}/${account}`}
          <a href={url} target="_blank">
            <div class={`avatar`}>
              <img src={`${url}.png`} alt={`Account ${account}`} />
            </div>
          </a>
        {/each}
      </nav>
    </div>
  </div>
</header>
