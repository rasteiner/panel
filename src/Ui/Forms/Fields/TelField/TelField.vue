<template>
  <kirby-text-field v-bind="$props" v-model="data" />
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    icon: {
      default: 'phone'
    },
    label: {
      default: 'Phone'
    },
    name: {
      default: 'phone'
    },
    type: {
      default: 'tel'
    }
  }
}

</script>
