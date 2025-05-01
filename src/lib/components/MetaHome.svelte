<script lang="ts">
  import { website } from '$lib'

  const authorName = 'Irhas',
    twitterUsername = 'irhasdev'
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>My dev journey | Building in public</title>
  <meta name="description" content="Just another dev grinding and sharing the real talk about coding." />
  <meta name="keywords" content="blog, programming journey, web development, coding tips, front-end design, knowledge sharing, growth mindset, dev grind" />
  <meta name="author" content={authorName} />
  <link rel="canonical" href={website} />

  <!-- Open graph metadata -->
  <meta property="og:title" content="My dev journey" />
  <meta property="og:description" content="Follow the journey of turning code into success, one commit at a time. Insights on web dev, design, and tech growth." />
  <meta property="og:image" content={`${website}/og-image.jpg`} />
  <meta property="og:url" content={website} />
  <meta property="og:type" content="website" />

  <!-- Twitter metadata -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${authorName} dev journey`} />
  <meta name="twitter:description" content="Turning struggles into solutions—explore tips, lessons, and stories from the world of coding and design." />
  <meta name="twitter:image" content={`${website}/twitter-image.jpg`} />
  <meta name="twitter:site" content={`@${twitterUsername}`} />

  <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
</svelte:head>
