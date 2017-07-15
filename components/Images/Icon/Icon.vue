<template>
  <i v-if="alt" :class="className" :aria-label="alt" role="img"></i>
  <i v-else :class="className" aria-hidden="true"></i>
</template>

<script>

export default {
  props: ['type', 'alt'],
  computed: {
    className: function() {
      return `kirby-icon fa fa-${this.type}`
    }
  }
}

</script>

<style lang="scss">

.kirby-icon {
  font-size: 14px;
}

</style>
