<script lang="ts">
  let element: any

  $: if (element) {
    // Concatenate the values to ensure broader compatibility
    const values = `${getComputedStyle(document.documentElement).getPropertyValue('--on-primary-container')};${getComputedStyle(document.documentElement).getPropertyValue('--on-background')};${getComputedStyle(document.documentElement).getPropertyValue('--on-primary-container')}`,
      values2 = `${getComputedStyle(document.documentElement).getPropertyValue('--on-background')};${getComputedStyle(document.documentElement).getPropertyValue('--on-primary-container')};${getComputedStyle(document.documentElement).getPropertyValue('--on-background')}`

    document.querySelector('#animate1')!.setAttribute('values', values)
    document.querySelector('#animate2')!.setAttribute('values', values2)
  }
</script>

<svg class={`under-construction-indicator`} width="100" height="100" viewBox="0 0 300 300" bind:this={element}>
  <defs>
    <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
      <stop offset="0%">
        <animate id="animate1" attributeName="stop-color" values={`var(--on-primary-container);var(--on-background);var(--on-primary-container)`} dur="5s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%">
        <animate id="animate2" attributeName="stop-color" values={`var(--on-background);var(--on-primary-container);var(--on-background)`} dur="8s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
    <clipPath id="clip">
      <rect class="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
      <rect class="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
      <rect class="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
      <rect class="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
      <rect class="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
      <rect class="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
      <rect class="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
    </clipPath>
  </defs>
  <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
</svg>
