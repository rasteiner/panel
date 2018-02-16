<template>
  <kirby-field class="kirby-time-field" v-bind="fieldProps">
    <kirby-time-input
      :mode="mode"
      :interval="interval"
      :now="now"
      :override="override"
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
    name: {
      default: "time"
    },
    label: {
      default: "Time"
    },
    icon: {
      default: "clock"
    },
    mode: {
      type: Number,
      default: 12
    },
    interval: {
      type: Number,
      default: 5
    },
    now: {
      type: Boolean,
      default: false
    },
    override: {
      type: Boolean,
      default: false
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
