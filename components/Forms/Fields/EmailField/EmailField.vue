<template>
  <kirby-text-field v-bind="$props"></kirby-text-field>
</template>

<script>

import TextField from '../TextField/TextField.vue';
import TextProps from '../TextField/TextField.props.js';

export default {
  mixins: [TextProps],
  components: {
    'kirby-text-field': TextField
  },
  props: {
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
    tpye: {
      default: 'email'
    }
  }
}

</script>
