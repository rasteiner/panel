<template>
  <kirby-field v-bind="$props">
    <kirby-text-input v-bind="$props" v-model="data" />
  </kirby-field>
</template>

<script>

import FieldProps from './TextField.props.js';

export default {
  mixins: [FieldProps],
}

</script>
