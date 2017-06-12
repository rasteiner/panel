<template>
  <div class="kirby-bar" :data-dark="dark">
    <div class="kirby-bar-slot" data-position="left"><slot name="left" /></div>
    <div class="kirby-bar-slot" data-position="center"><slot name="center" /></div>
    <div class="kirby-bar-slot" data-position="right"><slot name="right" /></div>
  </div>
</template>

<script>

export default {
  props: ['dark']
}

</script>

<style lang="scss">

.kirby-bar {
  height: 3rem;
  background: $color-white;
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
  padding: 1rem 3rem;
}
.kirby-bar-slot[data-position="center"] {
  text-align: center;
}
.kirby-bar-slot[data-position="right"] {
  text-align: right;
}
.kirby-bar-slot[data-position="left"] .kirby-breadcrumb {
  margin-left: -1.5rem;
}

</style>
