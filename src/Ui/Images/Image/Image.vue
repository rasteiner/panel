<template>
  <figure class="kirby-image" :data-ratio="ratio" :data-back="back" :data-cover="cover">
    <span>
      <transition name="kirby-image-transition">
        <img v-if="loaded" :src="src" :alt="alt || ''">
      </transition>
    </span>
  </figure>
</template>

<script>

export default {
  props: [
    'src',
    'alt',
    'ratio',
    'back',
    'cover'
  ],
  data() {
    return {
      loaded: false
    }
  },
  created() {
    let img = new Image();

    img.onload = function () {
      this.loaded = true;
    }.bind(this);

    img.onerror = function(message) {
      this.loaded = true;
    }.bind(this);

    img.src = this.src;
  }
}

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

.kirby-image-transition-enter-active,
.kirby-image-transition-leave-active {
  transition: opacity .2s
}
.kirby-image-transition-enter,
.kirby-image-transition-leave-to {
  opacity: 0
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
.kirby-image[data-back="pattern"] span {
  background: url(/images/pattern.png);
}

</style>
