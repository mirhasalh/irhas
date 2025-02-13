<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import { HomePageState } from '../../state.svelte'
  import 'highlight.js/styles/atom-one-dark.css'
  import Sanitized from '$lib/components/Sanitized.svelte'
  import { formatDate, website, initFadeInAnimation } from '$lib'
  import { PostPageState } from './state.svelte'

  let { data }: { data: PageData } = $props(),
    homePageState = new HomePageState(),
    pageState = new PostPageState(),
    articelEl: HTMLElement

  const cover = data.post.imageUrl ? data.post.imageUrl : `${website}/og-image.jpg`,
    headings = data.post.headings ? data.post.headings.map((item) => item.replace(/-/g, ' ')) : [],
    keywords = [data.post.title, ...headings, ...data.post.tags],
    fb = `https://www.facebook.com/sharer/sharer.php?u=${website}/post/${data.post.slug}`,
    x = `https://twitter.com/intent/tweet?text=Check%20this%20out!&url=${website}/post/${data.post.slug}`,
    l = `https://www.linkedin.com/sharing/share-offsite/?url=${website}/post/${data.post.slug}`,
    wa = `https://wa.me/?text=Check%20this%20out!%20${website}/post/${data.post.slug}`,
    tg = `https://t.me/share/url?url=${website}/post/${data.post.slug}&text=Check%20this%20out!`

  if (browser) {
    pageState.registerLanguages()
    homePageState.setReadingMode(true)
  }

  const onArticelEl = () => {
    articelEl.querySelectorAll('pre code').forEach((codeEl) => {
      pageState.highlightElement(codeEl as HTMLElement)
    })
  }

  onMount(() => {
    initFadeInAnimation()
    if (articelEl) onArticelEl()
  })
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
  <meta name="keywords" content={keywords.join(', ')} />

  <!-- Open graph metadata -->
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.excerpt} />
  <meta property="og:image" content={cover} />
  <meta property="og:url" content={`${website}/post/${data.post.slug}`} />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={data.post.publishedAt} />
  <meta property="article:tag" content={data.post.tags.join(', ')} />

  <!-- Twitter cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.excerpt} />
  <meta name="twitter:image" content={cover} />

  <!-- Canonical URL -->
  <link rel="canonical" href={`${website}/post/${data.post.slug}`} />
</svelte:head>

<article bind:this={articelEl}>
  <div class={`post-info`}>
    <p class={`uppercase`}><small><strong>{data.post.categories.join(', ')}</strong></small></p>
    <p><small>{`${formatDate(data.post.publishedAt)} • ${data.post.readingTime} min read`}</small></p>
  </div>
  <h1>{data.post.title}</h1>
  <p>{data.post.excerpt}</p>
  <div class={`px flex-wrap gap`}>
    <a class="btn btn-circle sm" href={fb} target="_blank">
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Facebook</title>
        <path d="M11.9998 4C7.58169 4 4 7.59492 4 12.0294C4 15.7948 6.58299 18.9546 10.0674 19.8224V14.4832H8.41783V12.0294H10.0674V10.9721C10.0674 8.2392 11.2997 6.97248 13.9729 6.97248C14.4798 6.97248 15.3543 7.07236 15.7121 7.17193V9.39607C15.5233 9.37616 15.1953 9.3662 14.7879 9.3662C13.4763 9.3662 12.9694 9.86499 12.9694 11.1616V12.0294H15.5825L15.1335 14.4832H12.9694V20C16.9306 19.5198 20 16.1347 20 12.0294C19.9997 7.59492 16.418 4 11.9998 4Z" />
      </svg>
    </a>
    <a class="btn btn-circle sm" href={l} target="_blank">
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Linkedin</title>
        <path d="M18.8156 4H5.18125C4.52812 4 4 4.51563 4 5.15313V18.8438C4 19.4812 4.52812 20 5.18125 20H18.8156C19.4688 20 20 19.4813 20 18.8469V5.15313C20 4.51563 19.4688 4 18.8156 4ZM8.74687 17.6344H6.37188V9.99687H8.74687V17.6344ZM7.55938 8.95625C6.79688 8.95625 6.18125 8.34062 6.18125 7.58125C6.18125 6.82187 6.79688 6.20625 7.55938 6.20625C8.31875 6.20625 8.93437 6.82187 8.93437 7.58125C8.93437 8.3375 8.31875 8.95625 7.55938 8.95625ZM17.6344 17.6344H15.2625V13.9219C15.2625 13.0375 15.2469 11.8969 14.0281 11.8969C12.7937 11.8969 12.6062 12.8625 12.6062 13.8594V17.6344H10.2375V9.99687H12.5125V11.0406H12.5437C12.8594 10.4406 13.6344 9.80625 14.7875 9.80625C17.1906 9.80625 17.6344 11.3875 17.6344 13.4438V17.6344Z" />
      </svg>
    </a>
    <a class="btn btn-circle sm" href={tg} target="_blank">
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Telegram</title>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 12C20 16.4183 16.4183 20 12 20C7.58173 20 4 16.4183 4 12C4 7.58173 7.58173 4 12 4C16.4183 4 20 7.58173 20 12ZM12.2867 9.90597C11.5086 10.2296 9.95343 10.8995 7.62127 11.9155C7.24255 12.0661 7.04417 12.2135 7.02611 12.3575C6.99559 12.601 7.30047 12.6969 7.71563 12.8274C7.77213 12.8452 7.83063 12.8636 7.89063 12.8831C8.2991 13.0158 8.84857 13.1712 9.1342 13.1774C9.3933 13.183 9.6825 13.0761 10.0018 12.8569C12.1808 11.386 13.3056 10.6425 13.3762 10.6265C13.426 10.6152 13.4951 10.601 13.5418 10.6426C13.5886 10.6841 13.584 10.7629 13.5791 10.784C13.5489 10.9128 12.3521 12.0254 11.7327 12.6012C11.5397 12.7807 11.4027 12.908 11.3747 12.9371C11.312 13.0022 11.2481 13.0638 11.1867 13.1231C10.8072 13.4889 10.5226 13.7632 11.2024 14.2112C11.5291 14.4265 11.7905 14.6045 12.0513 14.7821C12.3361 14.9761 12.6202 15.1695 12.9877 15.4104C13.0814 15.4718 13.1708 15.5356 13.2579 15.5977C13.5894 15.834 13.8872 16.0463 14.2551 16.0124C14.4688 15.9927 14.6896 15.7917 14.8018 15.1922C15.0668 13.7754 15.5878 10.7056 15.7081 9.44063C15.7187 9.32983 15.7054 9.18797 15.6948 9.1257C15.6841 9.06347 15.6618 8.97473 15.5809 8.90907C15.4851 8.8313 15.3371 8.8149 15.2709 8.81607C14.97 8.82137 14.5084 8.98187 12.2867 9.90597Z" />
      </svg>
    </a>
    <a class="btn btn-circle sm" href={wa} target="_blank">
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>WhatsApp</title>
        <path d="M4 20L5.13003 15.8913C4.43272 14.6887 4.06631 13.3253 4.06698 11.9273C4.06899 7.55667 7.64264 4 12.0335 4C14.1643 4.00067 16.1644 4.82667 17.6689 6.32533C19.1727 7.824 20.0007 9.816 20 11.9347C19.998 16.306 16.4243 19.8627 12.0335 19.8627C10.7005 19.862 9.38692 19.5293 8.22339 18.8973L4 20ZM8.41899 17.462C9.54166 18.1253 10.6134 18.5227 12.0308 18.5233C15.6801 18.5233 18.6529 15.5673 18.6549 11.9333C18.6563 8.292 15.6976 5.34 12.0362 5.33867C8.38416 5.33867 5.41338 8.29467 5.41204 11.928C5.41137 13.4113 5.84811 14.522 6.5816 15.684L5.91242 18.116L8.41899 17.462ZM16.0466 13.8193C15.997 13.7367 15.8644 13.6873 15.6647 13.588C15.4658 13.4887 14.4871 13.0093 14.3043 12.9433C14.1221 12.8773 13.9894 12.844 13.8561 13.0427C13.7235 13.2407 13.3417 13.6873 13.2258 13.8193C13.1099 13.9513 12.9934 13.968 12.7944 13.8687C12.5955 13.7693 11.9538 13.5607 11.1935 12.8853C10.602 12.36 10.2021 11.7113 10.0862 11.5127C9.97036 11.3147 10.0742 11.2073 10.1733 11.1087C10.2631 11.02 10.3723 10.8773 10.4721 10.7613C10.5732 10.6467 10.606 10.564 10.673 10.4313C10.7393 10.2993 10.7065 10.1833 10.6563 10.084C10.606 9.98533 10.2082 9.01 10.0427 8.61333C9.8806 8.22733 9.71649 8.27933 9.59457 8.27333L9.21276 8.26667C9.08013 8.26667 8.86444 8.316 8.68224 8.51467C8.50004 8.71333 7.9856 9.192 7.9856 10.1673C7.9856 11.1427 8.69899 12.0847 8.79812 12.2167C8.89793 12.3487 10.2015 14.35 12.1983 15.208C12.6732 15.412 13.0443 15.534 13.333 15.6253C13.8099 15.776 14.244 15.7547 14.587 15.704C14.9694 15.6473 15.7645 15.2247 15.9307 14.762C16.0968 14.2987 16.0968 13.902 16.0466 13.8193Z" />
      </svg>
    </a>
    <a class="btn btn-circle sm" href={x} target="_blank">
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>X</title>
        <path d="M16.6009 4H19.0544L13.6943 10.7774L20 20H15.0627L11.1957 14.4066L6.77087 20H4.31595L10.049 12.7508L4 4H9.06262L12.5581 9.11262L16.6009 4ZM15.7399 18.3754H17.0993L8.32392 5.53928H6.86506L15.7399 18.3754Z" />
      </svg>
    </a>
  </div>
  <hr class={`md transparent`} />
  {#if data.post.videoUrl}
    <video width="100%" autoplay loop muted playsinline>
      <source src={data.post.videoUrl} type="video/mp4" />
      <track src="" kind="captions" srclang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  {:else if data.post.imageUrl}
    <img src={data.post.imageUrl} alt={data.post.title} width="100%" />
  {/if}
  <Sanitized html={data.code} />
  <ul class={`flex-wrap px`}>
    {#each data.post.tags as tag}
      {@const link = `/posts/tagged/${tag}`}
      <li class={`list-item`}><a class={`btn sm link`} href={link}>{`#${tag}`}</a></li>
    {/each}
  </ul>
</article>
