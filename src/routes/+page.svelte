<script lang="ts">
  import { browser } from '$app/environment'
  // import { avatar, bio, github, name } from '$lib/info.js'
  import { format, parseISO } from 'date-fns'
  import UnderConstructionIndicator from '$components/UnderConstructionIndicator.svelte'
  import GitHub from '$lib/icons/GitHub.svelte'
  import LinkedIn from '$lib/icons/LinkedIn.svelte'
  import Flutter from '$lib/icons/Flutter.svelte'

  /** @type {import('./$types').PageData} */
  export let data: any

  let isUnderConstruction = true

  const onSocial = (to: string) => {
    if (!browser) return
    switch (to) {
      case 'flutter':
        window.open('https://flutter.irhas.lol/', '_blank')
        break
      case 'github':
        window.open('https://github.com/mirhasalh', '_blank')
        break
      case 'linkedin':
        window.open('https://www.linkedin.com/in/irhasdev/', '_blank')
        break
      default:
        window.open('/', '_self')
        break
    }
  }
</script>

{#if isUnderConstruction}
  <div class={`under-construction-wrapper`}>
    <UnderConstructionIndicator />
    <div class={`caption`}><small>This Irhas's site is currently<br />under construction!</small></div>
    <hr />
    <div class={`socials`}>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('flutter')}><Flutter /></button>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('github')}><GitHub /></button>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('linkedin')}><LinkedIn /></button>
    </div>
  </div>
{:else}
  <div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
    <a href="/posts">View All </a>
    {#each data.posts as post}
      <article class="grid items-start grid-cols-4 gap-8">
        <time datetime={post.date}>
          {format(new Date(parseISO(post.date)), 'MMMM d, yyyy')}
        </time>
        <div>
          {@html post.preview.html}
        </div>
        <a href={`/post/${post.slug}`} data-sveltekit-prefetch>Visit</a>
      </article>
    {/each}
  </div>
{/if}
