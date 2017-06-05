<template>
  <i :class="'panel-icon fa fa-' + type"></i>
</template>

<script>

export default {
  props: ['type']
}

</script>

<style>

.panel-icon {
  font-size: 16px;
}

</style>
