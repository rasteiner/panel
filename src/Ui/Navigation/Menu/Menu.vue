<template>
  <div class="kirby-menu" :data-open="open" @click="close">
    <nav class="kirby-menu-container" @click.stop>
      <slot />
    </nav>
  </div>
</template>

<script>

export default {
  props: ['open'],
  methods: {
    close () {
      this.$emit('close');
    }
  }
}

</script>

<style lang="scss">

.kirby-menu {
  position: fixed;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($color-white, .5);
  z-index: 1;
  transform: translateX(-100%);
}

.kirby-menu-container {
  position: absolute;
  top: 0;
  bottom: 0;
  background: $color-dark;
  z-index: 2;

  [dir="ltr"] & {
    right: 4.5rem;
    left: 0;
  }
  [dir="rtl"] & {
    right: 0;
    left: 4.5rem;
  }
}

.kirby-menu[data-open] {
  transform: translateX(0);
}

@media screen and (min-width: $breakpoint-menu) {
  .kirby-menu {
    transform: translateX(0) !important;
  }

  .kirby-menu,
  .kirby-menu-container {
    width: $width-menu;

    [dir="ltr"] & {
      right: auto;
    }
    [dir="rtl"] & {
      left: auto;
    }
  }
}

.kirby-menu-container .kirby-button {
  display: block;
  width: 100%;
  padding: .25rem 1.5rem;
  color: $color-light-grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  [dir="ltr"] & {
    text-align: left;
  }
  [dir="rtl"] & {
    text-align: right;
  }
}
.kirby-menu-container .kirby-button:hover,
.kirby-menu-container .kirby-button:focus {
  color: $color-light;
}
.kirby-menu-container .kirby-button .kirby-icon svg * {
  fill: #fff;
}

.kirby-menu-section {
  padding: 1.5rem 0 0;
}

.kirby-menu-section-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 1.5rem;
}

</style>

