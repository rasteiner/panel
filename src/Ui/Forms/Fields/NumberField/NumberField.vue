<template>
  <kirby-field class="kirby-number-field" :id="_uid" v-bind="$props" @blur="change">
    <input
      type="number"
      :placeholder="placeholder"
      :disabled="disabled"
      :id="_uid"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :value.number="state"
      @input="input($event.target.value)"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    value: [Number, String],
    prefix: String,
    placeholder: String,
    min: {
      type: Number,
      default: 0
    },
    max: Number,
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>
