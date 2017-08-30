<template>
  <kirby-field v-bind="$props">
    <kirby-tags-input ref="input" v-bind="$props" />
  </kirby-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
  props: {
    label: {
      default: 'Tags'
    },
    name: {
      default: 'tags'
    },
    icon: {
      default: 'tag'
    },
    autocomplete: {
      default: false
    }
  }
}

</script>
