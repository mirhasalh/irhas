<script lang="ts">
  import { avatar, github } from '$lib'
  import Logo from './Logo.svelte'
</script>

<header class={`app-bar glass`}>
  <div class={`app-bar-contraint`}>
    <nav>
      <a href="/">
        <Logo width={36} height={36} />
      </a>
    </nav>
    <div class={`app-bar-actions`}>
      <nav>
        <a href={github} target="_blank">
          <div class={`avatar`}>
            <img src={avatar} alt="Irhas's GitHub" />
          </div>
        </a>
      </nav>
    </div>
  </div>
</header>
