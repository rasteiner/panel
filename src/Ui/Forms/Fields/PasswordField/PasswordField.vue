<template>
  <kirby-text-field v-bind="$props" v-model="data" />
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: String
    },
    label: {
      default: 'Password'
    },
    icon: {
      default: 'key'
    },
    name: {
      default: 'password'
    },
    type: {
      default: 'password'
    }
  }
}

</script>
