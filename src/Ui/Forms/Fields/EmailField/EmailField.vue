<template>
  <kirby-text-field v-bind="$props" v-model="data" />
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: String
    },
    label: {
      default: 'Email'
    },
    icon: {
      default: 'email'
    },
    name: {
      default: 'email'
    },
    placeholder: {
      default: 'mail@example.com'
    },
    type: {
      default: 'email'
    }
  }
}

</script>
