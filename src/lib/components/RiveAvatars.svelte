<script lang="ts">
  import Rive from './Rive.svelte'
  import { avatar as sharedAvatar } from '$lib/shared.svelte'

  let { width = 200, height = 200 } = $props()

  let index = $state(0)

  const avatars = ['avatar_1.riv', 'avatar_2.riv']

  const next = () => {
    if (index < avatars.length - 1) index += 1
  }

  const prev = () => {
    if (index > 0) index -= 1
  }
</script>

<div class={`rive-avatars-view`} style={`min-width: ${width}px; min-height: ${height + 4}px;`}>
  <h4 class={`shrink`}>{`${index + 1}/${avatars.length}`}</h4>
  <button aria-label="button" id={`prev`} type="button" class={`btn nav`} onclick={prev}>
    <span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0303 4.46967C10.3232 4.76256 10.3232 5.23744 10.0303 5.53033L7.56065 8L10.0303 10.4697C10.3232 10.7626 10.3232 11.2374 10.0303 11.5303C9.73743 11.8232 9.26255 11.8232 8.96966 11.5303L5.43933 8L8.96966 4.46967C9.26255 4.17678 9.73743 4.17678 10.0303 4.46967Z" fill="rgba(var(--on-surface-color) ,1)" />
      </svg>
    </span>
  </button>
  <button aria-label="button" id={`next`} type="button" class={`btn nav`} onclick={next}>
    <span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.96968 4.46967C5.67679 4.76256 5.67679 5.23744 5.96968 5.53033L8.43935 8L5.96968 10.4697C5.67679 10.7626 5.67679 11.2374 5.96968 11.5303C6.26257 11.8232 6.73745 11.8232 7.03034 11.5303L10.5607 8L7.03034 4.46967C6.73745 4.17678 6.26257 4.17678 5.96968 4.46967Z" fill="rgba(var(--on-surface-color) ,1)" />
      </svg>
    </span>
  </button>
  <div class={`avatars`} style={`left: ${index * width * -1}px;`}>
    {#each avatars as avatar}
      <div role="presentation" class={`avatar-item`} onmouseenter={() => (sharedAvatar.hover = true)} onmouseleave={() => (sharedAvatar.hover = false)}>
        <Rive fileName={avatar} {width} {height} />
      </div>
    {/each}
  </div>
</div>
