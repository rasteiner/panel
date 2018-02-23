<template>
  <kirby-field class="kirby-datetime-field" v-bind="$props" @icon="calendar = !calendar">
    <kirby-date-input
      ref="date"
      v-bind="date"
      :value="value ? value.date : null"
      @input="$emit('input', datetime)"
    />
    <kirby-time-input
      ref="time"
      v-bind="time"
      :value="value ? value.time : null"
      @input="$emit('input', datetime)"
    />

    <kirby-calendar-input
        v-show="calendar"
        :current="state"
        @input="setDate"
      />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    date: {},
    time: {}
  },
  data() {
    return {
      state: this.value,
      hasChanged: false,
      calendar: false
    };
  },
  computed: {
    datetime() {
      const date = this.$refs.date.date;
      let time = this.$refs.time.time;
      const mode = time.split(" ");

      // am/pm mode
      if (mode.length > 1) {
        time = mode[0];
      }

      // split hours and minutes
      time = time.split(":");

      // convert hour to 24h format
      if (mode.length > 1) {
        if (mode[1] === "pm" && time[0] < 12) {
          time[0] = parseInt(time[0]) + 12;
        } else if (mode[1] === "am" && time[0] === 12) {
          time[0] = 0;
        }
      }

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time[0],
        time[1]
      );
    }
  },
  methods: {
    setDate(date) {
      this.$refs.date.select(new Date(date));
      this.calendar = false;
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
  background: $color-white;
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
