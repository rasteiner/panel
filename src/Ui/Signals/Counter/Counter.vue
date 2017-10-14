<template>

  <div class="kirby-counter">
    <span :class="{ exceeded: count > max }">
      <span>{{ count }}</span> / {{ max }}
    </span>
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

.kirby-counter .exceeded > span {
  color: $color-negative;
}

</style>
