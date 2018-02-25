<template>
  <kirby-field class="kirby-time-field" :id="_uid" v-bind="$props" @blur="change">
    <kirby-time-input
      :id="_uid"
      :hours="hours"
      :step="step"
      :seconds="seconds"
      :value="state"
      @input="input"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";
import Times from "Ui/Forms/Inputs/TimeInput/TimeInput.times.js";

export default {
  mixins: [Field],
  props: {
    hours: {
      type: Number,
      default: 24
    },
    step: {
      type: Number,
      default: 5
    },
    seconds: Boolean
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
