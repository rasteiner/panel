<template>
  <kirby-field v-bind="$props">
    <kirby-tags v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import Tags from '../../Inputs/Tags/Tags.vue';
import Props from '../Text/Text.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-tags': Tags
  },
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