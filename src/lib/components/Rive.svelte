<script lang="ts">
  import { onMount } from 'svelte'
  import { website } from '$lib'
  import * as rive from '@rive-app/canvas'

  const initRive = () => {
    const canvasElement = document.getElementById('canvas') as HTMLCanvasElement | null

    if (canvasElement) {
      // Adjust canvas size for high-DPI displays
      const dpr = window.devicePixelRatio || 1
      canvasElement.width = 128 * dpr // Multiply by DPR
      canvasElement.height = 128 * dpr
      canvasElement.style.width = '200px' // Set CSS size
      canvasElement.style.height = '200px'

      const r = new rive.Rive({
        src: website + '/head_1.riv',
        canvas: canvasElement,
        stateMachines: 'State Machine 1',
        autoplay: true,
        onLoad: () => {
          // Ensure the drawing surface is resized
          r.resizeDrawingSurfaceToCanvas()
        }
      })
    }
  }

  onMount(() => initRive())
</script>

<canvas id="canvas"></canvas>
