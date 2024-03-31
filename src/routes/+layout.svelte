<script lang="ts">
  import '../styles/app.scss'
  import AppBar from '$components/AppBar.svelte'
</script>

<svelte:head>
  <title>Irhas's Dev</title>
  <meta name="description" content="Meet Irhas, a passionate front-end developer with 2 years of professional experience. Specializing in crafting seamless user experiences with Svelte for web and Flutter for mobile. Explore my portfolio to see innovative projects that blend form and function." />
</svelte:head>

<AppBar />
<slot />
