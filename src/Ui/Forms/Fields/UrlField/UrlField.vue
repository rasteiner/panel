<template>
  <kirby-text-field v-bind="$props" v-model="data" />
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    label: {
      default: 'URL'
    },
    icon: {
      default: 'chain'
    },
    name: {
      default: 'url'
    },
    placeholder: {
      default: 'https://'
    },
    type: {
      default: 'url'
    }
  }
}

</script>
