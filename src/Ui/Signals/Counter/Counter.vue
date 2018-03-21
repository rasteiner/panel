<template>

  <div v-if="!disabled" class="kirby-counter" :data-invalid="!valid">
    <span>{{ count }}</span><template v-if="max"> / {{ max }}</template>
  </div>

</template>

<script>
export default {
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number
  },
  computed: {
    count() {
      return this.value ? this.value.trim().length : 0;
    },
    valid() {
      if (this.min && this.count < this.min) {
        return false;
      }

      if (this.max && this.count > this.max) {
        return false;
      }

      return true;
    }
  }
};
</script>

<style lang="scss">
.kirby-counter {
  font-size: $font-size-small;
  font-family: $font-family-mono;
  color: $color-dark-grey;
}
.kirby-counter[data-invalid] > span {
  color: $color-negative;
}
</style>
