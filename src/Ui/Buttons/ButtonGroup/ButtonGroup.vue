<template>
  <div class="kirby-button-group">
    <slot />
  </div>
</template>

<script>

export default {
}

</script>

<style lang="scss">

.kirby-button-group {
  font-size: 0;
  margin-left: -1rem;
  margin-right: -1rem;
}
.kirby-button-group > .kirby-dropdown > .kirby-button,
.kirby-button-group > .kirby-button {
  padding: 1rem;
}
</style>
