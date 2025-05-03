<script lang="ts">
  import { reveal } from 'svelte-reveal'
  import { page } from '$app/state'
  import Menu from '$icons/Menu.svelte'

  let { leading, trailing } = $props()

  const urls = [
    { url: '/', title: 'Home' },
    { url: '/animations', title: 'Animations' },
    { url: '/posts', title: 'Posts' },
    { url: '/about', title: 'About' }
  ]
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="-1" role="button" class="btn btn-ghost lg:hidden" use:reveal={{ preset: 'blur' }}>
        <Menu />
      </div>
      <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {#each urls as u (u)}
          {@const active = u.url === '/' ? false : u.url === page.route.id}
          {@const link = active ? 'link link-primary' : 'link link-hover'}
          <li><a class={link} href={u.url}>{u.title}</a></li>
        {/each}
      </ul>
    </div>
    {@render leading?.()}
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#each urls as u, i (u)}
        {@const active = u.url === '/' ? false : u.url === page.route.id}
        {@const link = active ? 'link link-primary' : 'link link-hover'}
        <li><a class={link} href={u.url} use:reveal={{ preset: 'blur', delay: i * 200 }}>{u.title}</a></li>
      {/each}
    </ul>
  </div>
  <div class="navbar-end gap-2">
    {@render trailing?.()}
  </div>
</div>
