<script lang="ts">
  import { onMount } from 'svelte'

  let innerWidth = $state(0)
  let innerHeight = $state(0)

  interface Dot {
    x: number
    y: number
    radius: number
    alpha: number
    alphaDelta: number
    color: string
  }

  const colors: string[] = ['#060b10', '#1e242c', '#272f38', '#3b434c', '#14ffcc']
  const gap: number = 14
  const radius: number = 0.8

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let dots: Dot[] = []

  function initCanvas(): void {
    if (!canvas || !ctx) return

    canvas.width = innerWidth
    canvas.height = innerHeight

    dots = []

    const cols = Math.floor(canvas.width / gap)
    const rows = Math.floor(canvas.height / gap)
    const speed = 0.02

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        dots.push({
          x: x * gap,
          y: y * gap,
          radius,
          alpha: (1 - y / rows) * 0.5 + Math.random() * 0.5,
          alphaDelta: (Math.random() < 0.5 ? -1 : 1) * speed,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }
  }

  function draw(): void {
    ctx.clearRect(0, 0, canvas?.width, canvas?.height)

    for (const dot of dots) {
      dot.alpha += dot.alphaDelta
      if (dot.alpha <= 0.1 || dot.alpha >= 1) {
        dot.alphaDelta *= -1
      }

      ctx.beginPath()
      ctx.globalAlpha = dot.alpha
      ctx.fillStyle = dot.color
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1
    requestAnimationFrame(draw)
  }

  $effect(() => {
    if (innerWidth && innerHeight && ctx) {
      initCanvas()
    }
  })

  onMount(() => {
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Failed to get canvas context')
    ctx = context

    initCanvas()
    if (canvas) draw()
  })
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<canvas id="pixel-canvas" bind:this={canvas}></canvas>

<style>
  canvas#pixel-canvas {
    pointer-events: none;
    display: block;
    position: absolute;
    z-index: 1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    width: 100vw;
    height: 100vh;
  }
</style>
