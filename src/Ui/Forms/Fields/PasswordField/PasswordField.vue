<template>
  <kirby-text-field v-bind="$props" @input="input"></kirby-text-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
  props: {
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
