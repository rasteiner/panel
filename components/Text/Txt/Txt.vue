<template>
  <div class="kirby-txt">
    <slot />
  </div>
</template>

<script>

export default {
}

</script>

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

</style>
