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
  <button id={`prev`} type="button" class={`btn nav`} onclick={prev}>
    {`‹`}
  </button>
  <button id={`next`} type="button" class={`btn nav`} onclick={next}>
    {`›`}
  </button>
  <div class={`avatars`} style={`left: ${index * width * -1}px;`}>
    {#each avatars as avatar}
      <div role="presentation" class={`avatar-item`} onmouseenter={() => (sharedAvatar.hover = true)} onmouseleave={() => (sharedAvatar.hover = false)}>
        <Rive fileName={avatar} {width} {height} />
      </div>
    {/each}
  </div>
</div>
