<script lang="ts">
  export let avatar: string,
    alt: string,
    onAvatar = () => {}
</script>

<section class={`main-padding`}>
  <div class={`card`}>
    <div class={`banner`}>
      <img src={`./IMG_20240825-083515.webp`} alt={`Irhas's blog post banner`} />
      <div class={`avatar-wrapper`}>
        <div class={`circular-avatar`} role="presentation" on:click={() => onAvatar()}>
          <img src={avatar} {alt} />
        </div>
      </div>
      <ul class={`socials`}>
        <slot name="socials" />
      </ul>
    </div>
    <hr class={`md transparent`} />
    <slot />
  </div>
</section>
