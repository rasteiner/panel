<template>
  <div class="kirby-notification" :data-type="type">
    <kirby-icon :type="icon" /><span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    message: {
      type: String
    }
  },
  computed: {
    icon() {
      switch (this.type) {
        case "success":
          return "smile";
        case "error":
          return "alert";
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-notification {
  position: fixed;
  top: 1.5rem;
  background: $color-dark;
  color: $color-white;
  padding: 0.5rem 1rem 0.5rem 3rem;
  border-radius: $border-radius;
  font-family: $font-family-mono;
  font-size: $font-size-small;
  z-index: z-index(notification);

  [dir="ltr"] & {
    right: 1.5rem;
    padding: 0.5rem 1rem 0.5rem 3rem;
  }
  [dir="rtl"] & {
    left: 1.5rem;
    padding: 0.5rem 3rem 0.5rem 1rem;
  }
}
.kirby-notification .kirby-icon {
  position: absolute;
  top: 50%;
  margin-top: -0.525rem;

  [dir="ltr"] & {
    left: 1rem;
  }
  [dir="rtl"] & {
    right: 1rem;
  }
}
.kirby-notification[data-type="success"] .kirby-icon svg * {
  fill: $color-positive-on-dark;
}
.kirby-notification[data-type="error"] .kirby-icon svg * {
  fill: $color-negative-on-dark;
}
</style>
