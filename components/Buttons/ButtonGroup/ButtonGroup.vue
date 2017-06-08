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
}
.kirby-button-group > .kirby-dropdown,
.kirby-button-group > .kirby-button {
  margin-left: .75rem;
  margin-right: .75rem;
  font-size: 1rem;
}
.kirby-button-group > .kirby-dropdown:first-child,
.kirby-button-group > .kirby-button:first-child {
  margin-left: 0;
}
.kirby-button-group > .kirby-dropdown:last-child,
.kirby-button-group > .kirby-button:last-child {
  margin-right: 0;
}

</style>
