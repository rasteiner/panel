<template>
  <kirby-field class="kirby-number-field" v-bind="$props">
    <input
      type="number"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
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
    name: {
      default: 'number'
    },
    value: {
      type: Number
    },
    label: {
      default: 'Number'
    },
    placeholder: {
      type: String
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    }
  }
}

</script>
