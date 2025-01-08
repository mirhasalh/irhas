<script lang="ts">
  import { recentWork } from '$lib/info'
  import AppLink from './AppLink.svelte'
</script>

<h1 class={`animated-fade-in`}>Recent work</h1>
<ul class={`list`}>
  {#each recentWork as w}
    <li role={`listitem`} class={`list-item animated-fade-in`}>
      {#if w.id === 4}
        <AppLink text={`${w.title} (${w.year})`} urls={w.urls} />
      {:else}
        <a class={`link`} href={w.urls[0]} target="_blank">{`${w.title} (${w.year})`}</a>
      {/if}
      <figure>
        <img class={`cover`} src={w.imgUrl} alt={w.title} />
        <figcaption>
          <small>{w.desc}</small>
        </figcaption>
      </figure>
    </li>
  {/each}
</ul>
