<script lang="ts">
  import { browser } from '$app/environment'
  import { avatar, bio, github, name } from '$lib/info.js'
  import GitHub from '$lib/icons/GitHub.svelte'
  import LinkedIn from '$lib/icons/LinkedIn.svelte'
  import Flutter from '$lib/icons/Flutter.svelte'
  import Article from '$components/Article.svelte'
  import ProfileCard from '$components/ProfileCard.svelte'
  import Sanitized from '$components/Sanitized.svelte'

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

<ProfileCard {avatar} alt={`Irhas's avatar`} {onAvatar}>
  <svelte:fragment slot="socials">
    <li>
      <button class={`raw icon`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('flutter')}><Flutter /></button>
    </li>
    <li>
      <button class={`raw icon`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('github')}><GitHub /></button>
    </li>
    <li>
      <button class={`raw icon`} type="button" data-sveltekit-preload-data="hover" on:click={() => onSocial('linkedin')}><LinkedIn /></button>
    </li>
  </svelte:fragment>
  <Sanitized html={bio} />
</ProfileCard>
<hr class={`md transparent`} />
<header class={`section-header`}>
  <h2 class={`shrink`}>Blog posts</h2>
  <a href="/posts"><strong>View all →</strong></a>
</header>
{#if data.posts.length === 0}
  <section class={`main-padding`}>
    <p>Irhas haven't post anything yet.</p>
  </section>
{:else}
  {#each data.posts as post, i}
    <Article {post} />
    {#if i !== data.posts.length - 1}
      <hr class={`transparent`} />
    {/if}
  {/each}
{/if}
