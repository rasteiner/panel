<template>
  <div class="kirby-buttons">
    <slot />
  </div>
</template>

<script>

export default {
}

</script>

<style>

.kirby-buttons {  
  font-size: 0;
}
.kirby-buttons > .kirby-dropdown,
.kirby-buttons > .kirby-button {
  margin-left: .75rem;
  margin-right: .75rem;
  font-size: 1rem;
}
.kirby-buttons > .kirby-dropdown:first-child,
.kirby-buttons > .kirby-button:first-child {
  margin-left: 0;
}
.kirby-buttons > .kirby-dropdown:last-child,
.kirby-buttons > .kirby-button:last-child {
  margin-right: 0;
}

</style>
