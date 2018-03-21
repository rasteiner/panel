<template>
  <kirby-field class="kirby-datetime-field" v-bind="$props" @blur="change" @icon="calendar = !calendar">
    <kirby-date-input
      ref="date"
      v-bind="date"
      :value="state"
      :disabled="disabled"
      @input="updateDate"
    />
    <kirby-time-input
      ref="time"
      v-bind="time"
      :value="state"
      :disabled="disabled"
      @input="updateTime"
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
    date: Object,
    time: Object
  },
  data() {
    return {
      state: this.toState(this.value),
      hasChanged: false,
      calendar: false
    };
  },
  methods: {
    setDate(date) {
      this.$refs.date.select(date);
      this.calendar = false;
    },
    updateDate(date) {
      this.state.setDate(date.getDate());
      this.state.setMonth(date.getMonth());
      this.state.setFullYear(date.getFullYear());
      this.input(this.state);
    },
    updateTime(date) {
      this.state.setHours(date.getHours());
      this.state.setMinutes(date.getSeconds());
      this.input(this.state);
    },
    toState(value) {
      return value ? new Date(value) : new Date();
    }
  }
};
</script>

<style lang="scss">
.kirby-datetime-field .kirby-input-content {
  position: relative;
}

.kirby-datetime-field .kirby-date-inputs,
.kirby-datetime-field .kirby-time-inputs {
  display: inline-flex;
}

.kirby-datetime-field .kirby-time-inputs {
  [dir="ltr"] & {
    padding-left: 1rem;
  }
  [dir="rtl"] & {
    padding-right: 1rem;
  }
}

.kirby-datetime-field .kirby-input-icon {
  cursor: pointer;
}

.kirby-datetime-field .kirby-calendar-input {
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
