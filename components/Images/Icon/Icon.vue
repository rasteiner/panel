<template>
  <i :class="'kirby-icon fa fa-' + type"></i>
</template>

<script>

export default {
  props: ['type']
}

</script>

<style lang="scss">

.kirby-icon {
  font-size: 14px;
}

</style>
