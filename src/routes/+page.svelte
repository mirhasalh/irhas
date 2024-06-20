<script lang="ts">
  import { browser } from '$app/environment'
  import { avatar, bio, github, name } from '$lib/info.js'
  import GitHub from '$lib/icons/GitHub.svelte'
  import LinkedIn from '$lib/icons/LinkedIn.svelte'
  import Flutter from '$lib/icons/Flutter.svelte'
  import Article from '$components/Article.svelte'

  /** @type {import('./$types').PageData} */
  export let data: any

  const onSocial = (to: string) => {
    if (!browser) return
    switch (to) {
      case 'flutter':
        window.open('https://flutter.irhas.lol/', '_blank')
        break
      case 'github':
        window.open('https://github.com/' + github, '_blank')
        break
      case 'linkedin':
        window.open('https://www.linkedin.com/in/irhasdev/', '_blank')
        break
      default:
        window.open('/', '_self')
        break
    }
  }

  const onAvatar = () => {
    if (browser) window.open(avatar, '_blank')
  }
</script>

<svelte:head><title>{name}</title></svelte:head>

<div class={`section-header profiles`}>
  <div>
    <div role="none" class={`circle-avatar`} on:click={() => onAvatar()} on:keyup={() => {}}><img src={avatar} alt="Avatar" /></div>
    <hr class={`transparent`} />
    <p class={`shrink`}>{name}<br /><small>Software engineer</small></p>
  </div>
  <ul class={`socials`}>
    <li>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('flutter')}><Flutter /></button>
    </li>
    <li>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('github')}><GitHub /></button>
    </li>
    <li>
      <button class={`raw`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('linkedin')}><LinkedIn /></button>
    </li>
  </ul>
</div>
<p><small>{@html bio.replace(/\n/g, '<br>')}</small></p>
<hr class={`md`} />
<div>
  <div class={`section-header`}>
    <h2 class={`shrink`}>Blog posts</h2>
    <a href="/posts"><strong>View all →</strong></a>
  </div>
  {#if data.posts.length === 0}
    <p>Irhas haven't post anything yet.</p>
  {:else}
    {#each data.posts as post, i}
      <Article {post} />
      {#if i !== data.posts.length - 1}
        <hr class={`transparent`} />
      {/if}
    {/each}
  {/if}
</div>
