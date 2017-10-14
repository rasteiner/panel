<template>
  <kirby-field v-bind="$props">

    <template slot="options" v-if="max">
      <kirby-counter :value="data" :max="max"></kirby-counter>
    </template>

    <kirby-text-input v-bind="$props" v-model="data" />
  </kirby-field>
</template>

<script>

import FieldProps from './TextField.props.js';

export default {
  mixins: [FieldProps],
}

</script>
