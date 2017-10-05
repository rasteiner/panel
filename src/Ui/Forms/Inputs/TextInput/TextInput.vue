<template>
  <input v-bind="$props" @input="input">
</template>

<script>

import Props from './TextInput.props.js';

export default {
  mixins: [Props]
}

</script>
