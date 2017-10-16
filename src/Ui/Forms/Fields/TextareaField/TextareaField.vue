<template>
  <kirby-field v-bind="$props">
    <template slot="options" v-if="max">
      <kirby-counter :value="data" :max="max"></kirby-counter>
    </template>

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
    },
    max: {
      type: Number
    }
  }
}

</script>
