<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import type { PageData } from './$types'
  import { app } from '$lib/shared.svelte'
  import { HomePageState } from '../state.svelte'
  import { initFadeInAnimation, bio, techs, email, igEmbedCode } from '$lib'
  import Sanitized from '$lib/components/Sanitized.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new HomePageState(),
    selectedTech = $state('Flutter'),
    level = $derived(techs.filter((v) => v.name === selectedTech)[0].level)

  if (browser) pageState.setReadingMode(false)

  onMount(() => initFadeInAnimation())
</script>

<svelte:head>
  <script async src="//www.instagram.com/embed.js"></script>
</svelte:head>

<section class={`px pt`}>
  <h1 class={`text-center animated-fade-in`}>About</h1>
</section>
<section class={`px mb`}>
  <div class={`about-grid animated-fade-in`}>
    <Sanitized html={igEmbedCode} />
    <div class={`greetings`}>
      <h1 class={`shrink`}>
        Hello there, I'm Irhas
        <span class={`wave`}>👋</span>
      </h1>
      <h2 class={`shrink`}>🎨 A Front-end engineer</h2>
      <p class={`shrink`}>
        Need help with <strong>Design</strong> or <strong>Front-end</strong> development?
        <br />
        <span>Get in touch 👉 <strong>{email}</strong></span>
      </p>
      <label class={`form-control`}>
        <div class={`label`}>
          <span class={`label-text`}>Bio</span>
        </div>
        <textarea class={`textarea`} value={bio} placeholder="Bio" rows="4" readonly></textarea>
      </label>
      <div class={`label`}>
        <p class={`shrink`}>
          Tech & tools I used so far
          {#if level > 80}
            <span>😍</span>
          {:else if level > 70}
            <span>😃</span>
          {:else if level > 40}
            <span>😑</span>
          {:else}
            <span>😤</span>
          {/if}
        </p>
      </div>
      <progress class={`progress`} value={level} max="100"></progress>
      <div class={`flex-wrap`}>
        {#each techs.map((v) => v.name) as tech}
          <label class={`choice-chip`} for={tech}>
            <input type="radio" id={tech} name={tech} value={tech} bind:group={selectedTech} />
            <small>{tech}</small>
          </label>
        {/each}
      </div>
    </div>
  </div>
</section>
<section>
  <h1 class={`px animated-fade-in`}>GitHub public stats</h1>
  <div class={`flex-center`}>
    <div class={`overflow-x animated-fade-in`} class:hidden={app.theme === 'dark'}>
      <Sanitized html={data.light?.code} />
    </div>
    <div class={`overflow-x animated-fade-in`} class:hidden={app.theme === 'light'}>
      <Sanitized html={data.dark?.code} />
    </div>
  </div>
</section>
