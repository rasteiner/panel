<template>
  <div class="kirby-line-field">
    <span></span>
  </div>
</template>

<script>


export default {
  props: {
    type: {
      default: 'line'
    }
  }
}

</script>

<style lang="scss">

  .kirby-line-field {
    padding-top: 2rem;
    padding-bottom: 1rem;

    > span {
      display: block;
      border-bottom: 1px solid $color-border;
    }

  }

</style>
