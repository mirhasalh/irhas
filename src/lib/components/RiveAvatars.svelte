<script lang="ts">
  import Rive from './Rive.svelte'
  import { app } from '$lib/shared.svelte'
  import ChevronLeft from '$lib/icons/tiny/ChevronLeft.svelte'
  import ChevronRight from '$lib/icons/tiny/ChevronRight.svelte'

  let { width = 200, height = 200 } = $props()

  let index = $state(0)

  const avatars = ['avatar_3.riv', 'avatar_1.riv', 'avatar_2.riv']

  const next = () => {
    if (index < avatars.length - 1) index += 1
  }

  const prev = () => {
    if (index > 0) index -= 1
  }
</script>

<div>
  <div class={`rive-avatars-view`} style={`min-width: ${width}px; min-height: ${height + 4}px;`}>
    <div class={`avatars`} style={`left: ${index * width * -1}px;`}>
      {#each avatars as avatar}
        <div role="presentation" class={`avatar-item`} onmouseenter={() => (app.avatarHovered = true)} onmouseleave={() => (app.avatarHovered = false)}>
          <Rive fileName={avatar} {width} {height} />
        </div>
      {/each}
    </div>
  </div>
  <div class={`nav-hug`}>
    <button aria-label="button" id={`prev`} type="button" class={`btn sm squared`} onclick={prev}>
      <span>
        <ChevronLeft />
      </span>
    </button>
    <h4 class={`shrink pointer-none`}>{`${index + 1}/${avatars.length}`}</h4>
    <button aria-label="button" id={`next`} type="button" class={`btn sm squared`} onclick={next}>
      <span>
        <ChevronRight />
      </span>
    </button>
  </div>
</div>
