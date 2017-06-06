<template>
  <i :class="'kirby-icon fa fa-' + type"></i>
</template>

<script>

export default {
  props: ['type']
}

</script>

<style>

.kirby-icon {
  font-size: 16px;
}

</style>
