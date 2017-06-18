<template>
  <kirby-text-field v-bind="$props"></kirby-text-field>
</template>

<script>

import TextField from '../Text/Text.vue';
import TextProps from '../Text/Text.props.js';

export default {
  mixins: [TextProps],
  components: {
    'kirby-text-field': TextField
  },
  props: {
    label: {
      default: 'Phone'
    },
    icon: {
      default: 'phone'
    },
    name: {
      default: 'phone'
    },
    type: {
      default: 'tel'
    }
  }
}

</script>