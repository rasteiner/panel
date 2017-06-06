<template>
  <span @click.stop class="kirby-dropdown">
    <slot />
  </span>
</template>

<script>

export default {
}

</script>

<style>

.kirby-dropdown {
  position: relative;
}

</style>
