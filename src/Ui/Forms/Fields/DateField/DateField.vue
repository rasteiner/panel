<template>
  <kirby-field class="kirby-date-field" v-bind="$props" @icon="calendar = !calendar" @blur="change">

      <kirby-date-input
        ref="date"
        :range="range"
        :value="state"
        :disabled="disabled"
        @input="input"
      />

      <kirby-calendar-input
        v-show="calendar"
        :current="state"
        :disabled="disabled"
        @input="setDate"
      />

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    range: {
      type: [Boolean, Number],
      default: 10
    }
  },
  data() {
    return {
      state: new Date(this.value),
      hasChanged: false,
      calendar: false
    };
  },
  watch: {
    value(date) {
      this.state = new Date(date);
    }
  },
  methods: {
    setDate(date) {
      this.$refs.date.select(date);
      this.calendar = false;
    }
  }
};
</script>

<style lang="scss">
.kirby-date-field .kirby-input-content {
  position: relative;
}

.kirby-date-field .kirby-input-icon {
  cursor: pointer;
}

.kirby-date-field .kirby-calendar-input {
  position: absolute;
  top: 100%;
  right: -48px;
  z-index: z-index(dropdown);

  &::before {
    $tooltip-size: 8px;
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    right: 15px;
    top: $tooltip-size * -1;
    border-style: solid;
    border-width: 0 $tooltip-size $tooltip-size $tooltip-size;
    border-color: transparent transparent $color-dark transparent;
  }
}
</style>
