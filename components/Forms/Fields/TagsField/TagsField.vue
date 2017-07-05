<template>
  <kirby-field v-bind="$props">
    <kirby-tags-input v-bind="$props" />
  </kirby-field>
</template>

<script>

import Field from 'Forms/Field/Field.vue';
import TagsInput from 'Forms/Inputs/TagsInput/TagsInput.vue';
import Props from 'Forms/Fields/TextField/TextField.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-tags-input': TagsInput
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
