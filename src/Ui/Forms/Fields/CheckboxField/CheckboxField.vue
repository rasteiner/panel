<template>
  <kirby-field class="kirby-checkbox-field" v-bind="$props">
    <kirby-checkbox-input :text="text" v-model="data" v-bind="$props" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      default: 'check'
    },
    text: {
      type: String
    }
  }
}

</script>

<style lang="scss">

.kirby-checkbox-field .kirby-input-content {
  padding: .45rem .65rem;
}

</style>
