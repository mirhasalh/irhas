<script lang="ts">
  import { accounts, github } from '$lib'
</script>

<div class={`avatar-group`}>
  {#each accounts as account}
    <a class={`git-avatar`} href={`${github}/${account}`} target="_blank">
      <img src={`${github}/${account}.png`} alt={account} width="36" height="36" />
    </a>
  {/each}
</div>
