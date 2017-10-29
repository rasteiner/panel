<template>
  <input :id="name" v-bind="$props" autocomplete="off" v-model="data">
</template>

<script>

import Input from '../Input.mixin.js';

export default {
  mixins: [Input],
  props: {
    value: {
      type: String
    },
    placeholder: {}
  }
}

</script>
