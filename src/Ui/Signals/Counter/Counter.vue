<template>

  <div class="kirby-counter" :data-exceeded="count > max">
    <span>{{ count }}</span> / {{ max }}
  </div>

</template>

<script>
export default {
  props: ['value', 'max'],
  computed: {
    count () {
      return this.value ? this.value.length : 0;
    }
  }
}
</script>

<style lang="scss">

.kirby-counter {
  font-size: $font-size-small;
  font-family: $font-family-mono;
  color: $color-dark-grey;
}
.kirby-counter[data-exceeded] > span {
  color: $color-negative;
}

</style>
