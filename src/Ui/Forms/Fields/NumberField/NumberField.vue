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
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Icon from "Ui/Forms/Field/Mixins/Icon.js";
import Placeholder from "Ui/Forms/Field/Mixins/Placeholder.js";
import Prefix from "Ui/Forms/Field/Mixins/Prefix.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Step from "Ui/Forms/Field/Mixins/Step.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [
    Field,
    Label,
    Help,
    Icon,
    Placeholder,
    Prefix,
    Required,
    Step,
    Value
  ],
  props: {
    value: [Number, String],
    min: {
      type: Number,
      default: 0
    },
    max: Number
  }
};
</script>
