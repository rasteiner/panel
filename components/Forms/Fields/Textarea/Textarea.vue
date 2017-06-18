<template>
  <kirby-field v-bind="$props">
    <kirby-textarea v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import Textarea from '../../Inputs/Textarea/Textarea.vue';
import Props from '../Text/Text.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-textarea': Textarea
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