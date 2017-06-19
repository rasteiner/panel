<template>
  <kirby-field v-bind="$props">
    <kirby-textarea-input v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import TextareaInput from '../../Inputs/TextareaInput/TextareaInput.vue';
import Props from '../TextField/TextField.props.js';

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
      default: 'align-left'
    }
  }
}

</script>