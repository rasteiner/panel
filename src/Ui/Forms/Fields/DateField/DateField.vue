<template>
  <kirby-field class="kirby-date-field" v-bind="$props">
    <kirby-date-input v-bind="$props" v-model="data" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    label: {
      default: 'Date'
    },
    name: {
      default: 'date'
    },
    icon: {
      default: 'calendar'
    }
  }
}

</script>

<style lang="scss">

.kirby-date-field .kirby-date-selects {
  background: $color-white;
}

</style>

