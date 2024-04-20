<script lang="ts">
  import { isMobile } from '$stores/isMobile'
  import { format, parseISO } from 'date-fns'

  export let post: any
</script>

<article class={`blog-post`} class:sm={$isMobile}>
  <div class={`leading`}>
    <time datetime={post.date}>{format(new Date(parseISO(post.date)), `${$isMobile ? 'MMM d, yyyy' : 'MMMM d, yyyy'}`)}</time>
    <br />
    <small>{post.readingTime}</small>
  </div>
  <div class={`preview`}>
    <h3>{post.title}</h3>
    <small>{@html post.preview.html}</small>
    <a href={`/post/${post.slug}`} data-sveltekit-prefetch><strong>Read →</strong></a>
  </div>
</article>
