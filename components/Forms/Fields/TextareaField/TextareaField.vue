<template>
  <kirby-field v-bind="$props">
    <kirby-textarea-input v-bind="$props" @input="$emit('input', $event)" />
  </kirby-field>
</template>

<script>

import Field from 'Forms/Field/Field.vue';
import TextareaInput from 'Forms/Inputs/TextareaInput/TextareaInput.vue';
import Props from 'Forms/Fields/TextField/TextField.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-textarea-input': TextareaInput
  },
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
