<script lang="ts">
  import { recentWork } from '$lib/info'
</script>

<h1 class={`animated-fade-in`}>Recent work</h1>
<ul class={`list`}>
  {#each recentWork as w}
    <li role={`listitem`} class={`list-item animated-fade-in`}>
      <span>
        <strong>{w.year}</strong>
        <br />
        {w.title}
      </span>
      <figure>
        <img class={`cover`} src={w.imgUrl} alt={w.title} />
        <figcaption>
          <small>{w.desc}</small>
        </figcaption>
      </figure>
    </li>
  {/each}
</ul>
