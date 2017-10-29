<template>
  <div class="kirby-loader" :data-position="position" :data-theme="theme">
    <div></div>
  </div>
</template>

<script>
export default {
  props: ['position', 'theme']
}
</script>

<style lang="scss">

.kirby-loader div {
  width: 2rem;
  height: 2rem;
  border: 3px solid $color-dark;
  border-radius: 100%;
  animation: sk-scaleout 1.0s infinite ease-in-out;
}

.kirby-loader[data-position="center"] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
.kirby-loader[data-theme="light"] div {
  border-color: $color-white;
  opacity: 1;
}

@-webkit-keyframes sk-scaleout {
  0% {
    transform: scale(0)
  }
  100% {
    transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    transform: scale(0);
  } 100% {
    transform: scale(1.0);
    opacity: 0;
  }
}

</style>
