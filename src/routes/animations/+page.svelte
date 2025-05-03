<script lang="ts">
  import { reveal } from 'svelte-reveal'
  import Rive from '$components/Rive.svelte'

  const width = 200,
    height = 200,
    avatars = [
      { id: 0, fileSize: 4, file: 'avatar_3.riv' },
      { id: 1, fileSize: 4, file: 'avatar_1.riv' },
      { id: 2, fileSize: 3, file: 'avatar_2.riv' }
    ]
</script>

<div class="hero min-h-screen">
  <div class="hero-overlay-gradient-peach"></div>
  <div class="hero-content text-center relative z-10">
    <div class="max-w-3xl">
      <h1 id="animations" class="text-5xl font-bold merriweather" use:reveal={{ preset: 'blur' }}>Animations</h1>
      <p class="py-6 hidden md:block" use:reveal={{ preset: 'blur' }}>
        Built in <a class="link link-hover link-secondary" href="https://rive.app/" target="_blank">Rive</a>, super lightweight and the file size stays tiny.
        <br />
        Perfect for keeping things fast without losing quality.
      </p>
      <p class="py-6 text-sm block md:hidden" use:reveal={{ preset: 'blur' }}>
        Built in <a class="link link-hover link-secondary" href="https://rive.app/" target="_blank">Rive</a>, super lightweight and the file size stays tiny. Perfect for keeping things fast without losing quality.
      </p>
      <ul class="flex flex-wrap justify-center items-center gap-2">
        {#each avatars as avatar, i (avatar.id)}
          <li>
            <div class="card bg-base-100 shadow-sm">
              <Rive fileName={avatar.file} {width} {height} />
              <div class="card-body">
                <p use:reveal={{ preset: 'blur', delay: i * 200 }}>{avatar.fileSize} kb</p>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
