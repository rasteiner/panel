<template>
  <kirby-field v-bind="$props" class="kirby-select-field">
    <kirby-select-input v-model="data" v-bind="$props" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      default: 'Select'
    },
    name: {
      default: 'select'
    },
    icon: {
      default: 'angle-down'
    },
    options: {
      type: Array,
      default: []
    }
  }
}

</script>

<style lang="scss">

.kirby-select-field .kirby-select-input select {
  width: calc(100% + 3rem);

  [dir="ltr"] & {
     right: -3rem;
  }
  [dir="rtl"] & {
     left: -3rem;
  }
}

.kirby-select-field .kirby-input-icon {
  pointer-events: none;
}

</style>
