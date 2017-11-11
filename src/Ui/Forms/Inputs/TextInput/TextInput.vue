<template>
  <input :id="name" v-bind="$props" autocomplete="off" v-model="data" class="kirby-text-input">
</template>

<script>

import Input from '../Input.mixin.js';

export default {
  mixins: [Input],
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {}
  }
}

</script>
