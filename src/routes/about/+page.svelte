<script lang="ts">
  import { bio, website, gitHubAccounts, recentWork } from '$lib'
  import Tick from '$icons/Tick.svelte'
</script>

<div class={`hero min-h-screen`}>
  <div class={`hero-content flex-col lg:flex-row-reverse max-w-3xl`}>
    <img src={`${website}/IMG_20250501-170202.webp`} class={`max-w-sm rounded-lg shadow-2xl`} alt="Irhas dev author" />
    <div>
      <h1 id={`greetings`} class={`merriweather text-5xl font-bold`}>Hi there, I'm Irhas</h1>
      <p class={`py-6`}>{bio}</p>
      <h2 id={`github-accounts`} class={`font-bold merriweather text-4xl`}>GitHub accounts</h2>
      <p class={`py-4`}>Hopefully, these say a lot about my coding journey.</p>
      <div class={`avatar-group -space-x-6`}>
        {#each gitHubAccounts as acc}
          <div class={`avatar`}>
            <a class={`w-12`} href={`https://github.com/${acc}`} target="_blank">
              <img src={`https://github.com/${acc}.png`} alt={`GitHub ${acc}`} />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<section class={`max-w-4xl mx-auto`}>
  <h2 id={`work-history`} class={`merriweather text-4xl m-4 font-bold`}>Work history</h2>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical px-4">
    {#each recentWork as w, i}
      {@const isEven = i % 2 == 0}
      {@const textStyle = isEven ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'}
      <li>
        <div class={`timeline-middle`}>
          <Tick />
        </div>
        <div class={textStyle}>
          <time class={`font-mono italic`}>{w.year}</time>
          <div class={`text-lg font-black merriweather`}>{w.title}</div>
          <img class={'hidden'} src={w.imgUrl} alt={w.title} />
          <small>{w.desc}</small>
          <br />
          <a class={`btn btn-sm hidden`} href={w.urls[0]}>
            <span class={`text-sm`}>Visit</span>
          </a>
        </div>
        {#if i !== recentWork.length - 1}
          <hr />
        {/if}
      </li>
    {/each}
  </ul>
</section>
