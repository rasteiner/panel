<template>
  <kirby-field v-bind="$props">
    <kirby-select-input v-bind="$props" />
  </kirby-field>
</template>

<script>

import Field from 'Forms/Field/Field.vue';
import SelectInput from 'Forms/Inputs/SelectInput/SelectInput.vue';
import Props from 'Forms/Fields/TextField/TextField.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-select-input': SelectInput
  },
  props: {
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
    }
  }
}

</script>
