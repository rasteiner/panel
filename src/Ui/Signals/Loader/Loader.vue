<template>
  <kirby-icon class="kirby-loader" type="loader"></kirby-icon>
</template>

<style lang="scss">
.kirby-loader {
  float: right;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
