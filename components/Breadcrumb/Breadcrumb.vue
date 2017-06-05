<template>
  <ul :class="selector">
    <slot />
  </ul>
</template>

<script>

export default {
  computed: {
    selector: function () {
      var selector = 'panel-breadcrumb'

      if (this.dark === true) {
        selector += ' is-dark'
      }

      return selector
    }
  }
}

</script>

<style>

.panel-breadcrumb {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 3rem;
  padding: 0 1rem;
  background: #fff;
}

@media screen and (min-width: 30em) {
  .panel-breadcrumb {
    padding: 0 .5rem;
  }
}

</style>
