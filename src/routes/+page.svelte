<script lang="ts">
  import { browser } from '$app/environment'
  import { avatar, bio, github, name } from '$lib/info.js'
  import { format, parseISO } from 'date-fns'
  import GitHub from '$lib/icons/GitHub.svelte'
  import LinkedIn from '$lib/icons/LinkedIn.svelte'
  import Flutter from '$lib/icons/Flutter.svelte'

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
</script>

<div class={`circle-avatar`}><img src={avatar} alt="Avatar" /></div>
<p>{name}</p>
<small>{bio}</small>
<hr />
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
<hr />
<div>
  <h3>Blog posts</h3>
  {#if data.posts.length === 0}
    <p>Irhas haven't post anything yet.</p>
  {:else}
    {#each data.posts as post}
      <article>
        <time datetime={post.date}>{format(new Date(parseISO(post.date)), 'MMMM d, yyyy')}</time>
        <div>{@html post.preview.html}</div>
        <a href={`/post/${post.slug}`} data-sveltekit-prefetch>Visit</a>
      </article>
    {/each}
    <a href="/posts">View All </a>
  {/if}
</div>
