<template>
  <div class="kirby-notification" :data-type="type">
    <kirby-icon :type="icon" />{{ message }}
  </div>
</template>

<script>

export default {
  props: ['type', 'message'],
  computed: {
    icon () {
      switch (this.type) {
        case 'success':
          return 'smile-o';
        case 'error':
          return 'exclamation-triangle'
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
  padding: .5rem 1rem;
  border-radius: $border-radius;
  font-family: $font-family-mono;
  font-size: $font-size-small;
}
.kirby-notification .kirby-icon {
  margin-right: .75rem;
}
.kirby-notification[data-type="success"] .kirby-icon {
  color: $color-positive;
}
.kirby-notification[data-type="error"] .kirby-icon {
  color: $color-negative;
}

</style>

