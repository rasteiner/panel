<template>
  <span @click.stop class="panel-dropdown">
    <slot />
  </span>
</template>

<script>

export default {
}

</script>

<style>

.panel-dropdown {
  position: relative;
}

</style>
