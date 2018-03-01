<template>
  <figure class="kirby-image" :data-ratio="ratio" :data-back="back" :data-cover="cover">
    <span>
      <transition name="kirby-image-transition">
        <img v-if="loaded" :src="src" :alt="alt || ''" />
      </transition>
      <kirby-loader
        v-if="!loaded && !error"
        position="center"
        theme="light"
      />
      <kirby-icon
        v-if="!loaded && error"
        class="kirby-image-error"
        type="cancel"
      />
    </span>
  </figure>
</template>

<script>
export default {
  props: ["src", "alt", "ratio", "back", "cover"],
  data() {
    return {
      loaded: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      }
    };
  },
  created() {
    let img = new Image();

    img.onload = () => {
      this.loaded = true;
    };

    img.onerror = message => {
      this.error = true;
    };

    img.src = this.src;
  }
};
</script>

<style lang="scss">
.kirby-image span {
  position: relative;
  display: block;
  line-height: 0;
  padding-bottom: 100%;
}
.kirby-image img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.kirby-image-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $color-white;
  font-size: 0.9em;
}
.kirby-image-error svg * {
  fill: rgba($color-white, 0.3);
}

.kirby-image-transition-enter-active,
.kirby-image-transition-leave-active {
  transition: opacity 0.2s;
}
.kirby-image-transition-enter,
.kirby-image-transition-leave-to {
  opacity: 0;
}

.kirby-image[data-ratio="1/1"] span {
  padding-bottom: 100%;
}
.kirby-image[data-ratio="3/2"] span {
  padding-bottom: 66.66%;
}

.kirby-image[data-cover] img {
  object-fit: cover;
}

.kirby-image[data-back="black"] span {
  background: $color-dark;
}
.kirby-image[data-back="white"] span {
  background: $color-white;
}
.kirby-image[data-back="white"] .kirby-image-error {
  background: $color-dark;
}
.kirby-image[data-back="pattern"] span {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4yKSIgZD0iTTAgMGgxMHYxMEgwem0xMCAxMGgxMHYxMEgxMHoiLz48L3BhdHRlcm4+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==);
}
</style>
