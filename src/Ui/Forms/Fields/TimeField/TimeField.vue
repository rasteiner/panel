<template>
  <kirby-field class="kirby-time-field" :id="_uid" v-bind="$props" @blur="change">
    <kirby-time-input
      :id="_uid"
      :hours="hours"
      :disabled="disabled"
      :step="step"
      :value="state"
      @input="input"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Icon from "Ui/Forms/Field/Mixins/Icon.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Step from "Ui/Forms/Field/Mixins/Step.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

import Times from "Ui/Forms/Inputs/TimeInput/TimeInput.times.js";

export default {
  mixins: [Field, Label, Help, Icon, Required, Step, Value],
  props: {
    hours: {
      type: Number,
      default: 24
    }
  },
  methods: {
    toState(value) {
      return value instanceof Date ? value : Times.toDate(value);
    }
  }
};
</script>

<style lang="scss">
.kirby-time-field .kirby-input-content {
  padding: 0 0.65rem;
}

.kirby-time-field .kirby-time-inputs {
  background: $color-white;
}
</style>
