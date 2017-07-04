<template>
  <kirby-field v-bind="$props">
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :autofocus="autofocus">
  </kirby-field>
</template>

<script>

import Field from 'Forms/Field/Field.vue';
import Props from './TextField.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field
  }
}

</script>
