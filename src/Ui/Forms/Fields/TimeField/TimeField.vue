<template>
  <kirby-field class="kirby-time-field" :id="_uid" v-bind="$props" @blur="change">
    <kirby-time-input
      :id="_uid"
      :hours="hours"
      :step="step"
      :value="state"
      @input="input"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    hours: {
      type: Number,
      default: 12
    },
    step: {
      type: Number,
      default: 5
    },
    override: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toState(value) {
      if (!value || this.override === true) {
        return new Date();
      }

      let time = value.split(":");
      return new Date(2000, 0, 1, time[0], time[1]);
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
