<template>
  <div class="kirby-bar" :data-dark="dark">
    <div v-if="$slots.left" class="kirby-bar-slot" data-position="left"><slot name="left" /></div>
    <div v-if="$slots.center" class="kirby-bar-slot" data-position="center"><slot name="center" /></div>
    <div v-if="$slots.right" class="kirby-bar-slot" data-position="right"><slot name="right" /></div>
  </div>
</template>

<script>

export default {
  props: ['dark']
}

</script>

<style lang="scss">

.kirby-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
}
.kirby-bar[data-dark] {
  color: $color-light;
  background: $color-dark;
}
.kirby-bar-slot {
  flex-grow: 1;
}
.kirby-bar-slot[data-position="center"] {
  text-align: center;
}
.kirby-bar-slot[data-position="right"] {
  text-align: right;
}

</style>
