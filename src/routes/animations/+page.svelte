<script lang="ts">
  import Rive from '$components/Rive.svelte'

  let { width = 200, height = 200 } = $props()

  const avatars = [
    { fileSize: 4, file: 'avatar_3.riv' },
    { fileSize: 4, file: 'avatar_1.riv' },
    { fileSize: 3, file: 'avatar_2.riv' }
  ]
</script>

<div class={`hero min-h-screen`}>
  <div class={`hero-content text-center`}>
    <div class={`max-w-3xl`}>
      <h1 id={`animations`} class={`text-5xl font-bold merriweather`}>Animations</h1>
      <p class={`py-6`}>Built this in <a class={`link link-hover link-secondary`} href="https://rive.app/" target="_blank">Rive</a>, super lightweight and the file size stays tiny. Perfect for keeping things fast without losing quality.</p>
      <ul class={`flex flex-wrap justify-center items-center gap-2`}>
        {#each avatars as avatar}
          <li>
            <div class={`card bg-base-100 shadow-sm`}>
              <Rive fileName={avatar.file} {width} {height} />
              <div class={`card-body`}>
                <p>{avatar.fileSize} kb</p>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
