<template>
  <kirby-field v-bind="$props">
    <kirby-textarea-input v-bind="$props" v-model="data" @submit="$emit('submit', $event)" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    label: {
      default: 'Text'
    },
    name: {
      default: 'text'
    },
    icon: {
      default: 'text'
    }
  }
}

</script>
