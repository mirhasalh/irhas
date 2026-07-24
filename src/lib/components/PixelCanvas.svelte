<script lang="ts">
  import { onMount } from 'svelte'

  let innerWidth = $state(0)
  let parentHeight = $state(0)
  let mouseX = -9999
  let mouseY = -9999
  let smoothMouseX = -9999
  let smoothMouseY = -9999

  interface Dot {
    x: number
    y: number
    radius: number
    baseRadius: number
    color: string
    blinkSpeed: number
    blinkPhase: number
    driftAmp: number
    driftSpeed: number
    driftPhase: number
  }

  const smoothing = 0.12
  const colors: string[] = ['#060b10', '#1e242c', '#272f38', '#3b434c', '#14ffcc']
  const accent = '#14ffcc'
  const gap: number = 14
  const radius: number = 0.8
  const linkDist = gap * 1.9
  const mouseRadius = 130

  let canvasEl: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let dots: Dot[] = []
  let cols = 0
  let rowsCount = 0
  let rafId: number

  function initCanvas(): void {
    if (!canvasEl || !ctx) return
    canvasEl.width = innerWidth
    canvasEl.height = parentHeight
    dots = []
    cols = Math.floor(canvasEl.width / gap)
    rowsCount = Math.floor(canvasEl.height / gap)
    for (let y = 0; y <= rowsCount; y++) {
      for (let x = 0; x <= cols; x++) {
        dots.push({
          x: x * gap,
          y: y * gap,
          radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          blinkSpeed: Math.random() * 2 + 0.5,
          blinkPhase: Math.random() * Math.PI * 2,
          driftAmp: Math.random() * 1.6 + 0.4,
          driftSpeed: Math.random() * 0.6 + 0.2,
          driftPhase: Math.random() * Math.PI * 2
        })
      }
    }
  }

  let startTime = performance.now()

  function draw(): void {
    const currentTime = performance.now()
    const elapsed = (currentTime - startTime) / 1000
    ctx.clearRect(0, 0, canvasEl?.width, canvasEl?.height)

    smoothMouseX += (mouseX - smoothMouseX) * smoothing
    smoothMouseY += (mouseY - smoothMouseY) * smoothing

    const positions = dots.map((dot) => {
      const dx = Math.sin(elapsed * dot.driftSpeed + dot.driftPhase) * dot.driftAmp
      const dy = Math.cos(elapsed * dot.driftSpeed * 0.8 + dot.driftPhase) * dot.driftAmp
      return { x: dot.x + dx, y: dot.y + dy }
    })

    ctx.lineWidth = 0.5
    for (let y = 0; y <= rowsCount; y++) {
      for (let x = 0; x <= cols; x++) {
        const i = y * (cols + 1) + x
        if (!positions[i]) continue
        const neighbors = [i + 1, i + (cols + 1)]
        for (const j of neighbors) {
          if (!positions[j]) continue
          const a = positions[i]
          const b = positions[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            const distToMouse = Math.hypot((a.x + b.x) / 2 - smoothMouseX, (a.y + b.y) / 2 - smoothMouseY)
            const mouseBoost = Math.max(0, 1 - distToMouse / mouseRadius)
            const alpha = 0.04 + mouseBoost * 0.35
            ctx.strokeStyle = mouseBoost > 0.05 ? accent : '#3b434c'
            ctx.globalAlpha = alpha
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      const pos = positions[i]
      const blink = 0.5 + 0.5 * Math.sin(elapsed * dot.blinkSpeed + dot.blinkPhase)
      const distToMouse = Math.hypot(pos.x - smoothMouseX, pos.y - smoothMouseY)
      const proximity = Math.max(0, 1 - distToMouse / mouseRadius)

      const alpha = Math.min(1, blink * 0.7 + 0.3 + proximity * 0.6)
      const r = dot.baseRadius + proximity * 2.2

      ctx.beginPath()
      ctx.globalAlpha = alpha
      ctx.fillStyle = proximity > 0.15 ? accent : dot.color
      if (proximity > 0.15) {
        ctx.shadowColor = accent
        ctx.shadowBlur = 8 * proximity
      } else {
        ctx.shadowBlur = 0
      }
      ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
    rafId = requestAnimationFrame(draw)
  }

  const getParentHeight = () => {
    const parent = canvasEl.parentElement
    parentHeight = parent!.offsetHeight
  }

  function handlePointerMove(e: PointerEvent): void {
    if (!canvasEl) return
    const rect = canvasEl.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  }

  function handlePointerLeave(): void {
    mouseX = -9999
    mouseY = -9999
  }

  $effect(() => {
    if (innerWidth && ctx) {
      initCanvas()
    }
  })

  onMount(() => {
    const context = canvasEl.getContext('2d')
    if (!context) throw new Error('Failed to get canvas context')
    ctx = context

    if (canvasEl) getParentHeight()
    initCanvas()
    if (canvasEl) draw()

    return () => cancelAnimationFrame(rafId)
  })
</script>

<svelte:window bind:innerWidth onpointermove={handlePointerMove} onpointerleave={handlePointerLeave} />

<canvas class="pixel-canvas" bind:this={canvasEl}></canvas>

<style>
  canvas.pixel-canvas {
    width: inherit;
    height: inherit;
    pointer-events: none;
    display: block;
    position: relative;
    z-index: 1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  }
</style>
