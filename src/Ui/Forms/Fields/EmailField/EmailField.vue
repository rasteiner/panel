<template>
  <kirby-text-field v-bind="$props"></kirby-text-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
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
