<template>
  <div class="kirby-txt">
    <slot />
  </div>
</template>

<style lang="scss">
.kirby-txt {
  line-height: 1.5em;
}
.kirby-txt p {
  margin-bottom: 1.5em;
}
.kirby-txt strong,
.kirby-txt b {
  font-weight: 500;
}
.kirby-txt a {
  border-bottom: 2px solid $color-border;
  transition: border-bottom-color 0.3s;
}
.kirby-txt a:focus,
.kirby-txt a:hover {
  border-bottom-color: $color-focus;
}
</style>
