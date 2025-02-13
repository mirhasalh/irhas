<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<section>
  <div class={`hero`}>
    <h1>{data.app!.name}</h1>
    <div>
      <figure>
        <img class={`app-icon`} src={data.app!.icon} alt={data.app!.name} width="126" />
      </figure>
    </div>
  </div>
</section>
<section class={`px mb`}>
  <h2 id={`description`}>Description</h2>
  <p>{data.app!.description}</p>
</section>
<section class={`px mb`}>
  <h2 id={`privacy`}>Privacy Policy</h2>
  <p>Effective Date: {data.app!.privacy.effectiveDate}</p>
  <ol class={`list`}>
    {#each data.app!.privacy.declarations as d, i}
      <li class={`list-item`}><strong>{i + 1}. {d.title}</strong><br />{d.subtitle}</li>
    {/each}
  </ol>
</section>
