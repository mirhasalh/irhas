<script lang="ts">
  import { goto } from '$app/navigation'
  import { isMobile } from '$stores/isMobile'
  import { format, parseISO } from 'date-fns'

  export let post: any
</script>

<article role="presentation" class={`blog-post`} class:sm={$isMobile} on:click|preventDefault={() => goto(`/post/${post.slug}`)} on:keyup={() => goto(`/post/${post.slug}`)}>
  <div class={`leading`}>
    <time datetime={post.date}>{format(new Date(parseISO(post.date)), `${$isMobile ? 'MMM d, yyyy' : 'MMMM d, yyyy'}`)}</time>
    <br />
    <small>{post.readingTime}</small>
  </div>
  <div class={`preview`}>
    <h3>{post.title}</h3>
    {#if `${post.src}` !== 'n/a'}
      <div class={`image`}>
        <img src={post.src} alt={post.title} />
      </div>
    {/if}
    {@html post.preview.html}
    <a href={`/post/${post.slug}`} data-sveltekit-prefetch><strong>Read →</strong></a>
  </div>
</article>
