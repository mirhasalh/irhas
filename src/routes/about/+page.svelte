<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import { initFadeInAnimation } from '$lib'
  import { bio, email, igEmbedCode } from '$lib/info'
  import Sanitized from '$lib/components/Sanitized.svelte'

  let { data }: { data: PageData } = $props()

  onMount(() => initFadeInAnimation())
</script>

<svelte:head>
  <script async src="//www.instagram.com/embed.js"></script>
</svelte:head>

<section class={`px tp mb`}>
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
      <label class="form-control">
        <div class="label">
          <span class="label-text">Bio</span>
        </div>
        <textarea class="textarea h-150" value={bio} placeholder="Bio" readonly></textarea>
      </label>
    </div>
  </div>
</section>
<section>
  <h1 class={`px animated-fade-in`}>GitHub public stats</h1>
  <div class={`animated-fade-in light`}>
    <Sanitized html={data.light?.code} />
  </div>
  <div class={`animated-fade-in dark`}>
    <Sanitized html={data.dark?.code} />
  </div>
</section>
