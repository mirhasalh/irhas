<script lang="ts">
  import Dark from '$icons/Dark.svelte'
  import Light from '$icons/Light.svelte'

  let { isDark = $bindable(), onChanged, ...props }: { isDark: boolean; onChanged: (event: Event) => void } = $props()
</script>

<label class="swap swap-rotate btn btn-ghost">
  <input type="checkbox" onchange={onChanged} bind:checked={isDark} {...props} />
  <Light />
  <Dark />
</label>
