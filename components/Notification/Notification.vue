<template>
  <div class="kirby-notification" :data-type="type">
    <kirby-icon :type="icon" /><span>{{ message }}</span>
  </div>
</template>

<script>

export default {
  props: ['type', 'message'],
  computed: {
    icon () {
      switch (this.type) {
        case 'success':
          return 'smile';
        case 'error':
          return 'alert'
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-notification {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background: $color-dark;
  color: $color-white;
  padding: .5rem 1rem .5rem 3rem;
  border-radius: $border-radius;
  font-family: $font-family-mono;
  font-size: $font-size-small;
}
.kirby-notification .kirby-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  margin-top: -.525rem;
}
.kirby-notification[data-type="success"] .kirby-icon svg * {
  fill: $color-positive;
}
.kirby-notification[data-type="error"] .kirby-icon svg * {
  fill: $color-negative;
}

</style>

