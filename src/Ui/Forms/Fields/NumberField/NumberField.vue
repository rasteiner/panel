<template>
  <kirby-field class="kirby-number-field" v-bind="fieldProps">
    <input
      type="number"
      :min="min"
      :value="state"
      @input="input($event.target.value)"
    />
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: Number
    },
    label: {
      default: 'Number'
    },
    name: {
      default: 'number'
    },
    min: {
      default: 0
    }
  }
}

</script>
