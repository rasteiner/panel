<template>
  <div class="kirby-time-inputs">
    <kirby-select-input
      ref="hour"
      :options="times.hours(hours)"
      v-model.number="hour"
      class="hour"
    />
    <kirby-select-input
      ref="minute"
      :options="times.minutes(step)"
      v-model.number="minute"
    />
    <kirby-select-input
      v-if="seconds"
      ref="second"
      :options="times.minutes(step)"
      v-model.number="second"
      class="second"
    />
    <kirby-select-input
      v-if="hours === 12"
      ref="period"
      class="kirby-time-field-switch"
      :options="[
        { value: 'am', text: 'am' },
        { value: 'pm', text: 'pm' },
      ]"
      v-model="period"
    />
  </div>
</template>

<script>
import Times from "./TimeInput.times.js";

export default {
  props: {
    value: {},
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
  data() {
    return {
      hour: Times.hour(this.value.getHours(), this.hours),
      minute: this.value.getMinutes(),
      second: this.value.getSeconds(),
      period: this.value.getHours() >= 12 ? "pm" : "am"
    };
  },
  mounted() {
    this.minute = Times.minute(this.minute, this.step);
    this.second = Times.minute(this.second, this.step);
  },
  computed: {
    time() {
      return Times.asDate({
        hour: this.hour,
        minute: this.minute,
        second: this.second,
        period: this.period,
        military: this.hours === 24
      });
    },
    times() {
      return Times;
    }
  },
  watch: {
    hour() {
      this.$emit("input", this.time);
    },
    minute() {
      this.$emit("input", this.time);
    },
    period() {
      this.$emit("input", this.time);
    }
  },
  methods: {
    focus() {
      this.$refs.hour.focus();
    }
  }
};
</script>

<style lang="scss">
.kirby-time-inputs {
  position: relative;
  display: flex;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
  flex-grow: 1;
}

.kirby-time-inputs .hour:after {
  content: ":";
  padding: 0 0.1rem;
}

.kirby-time-inputs .second:before {
  content: ":";
  padding: 0 0.1rem;

  [dir="ltr"] & {
    margin-right: -0.2rem;
  }
  [dir="rtl"] & {
    margin-left: -0.2rem;
  }
}

.kirby-time-field-switch {
  padding-left: 0.5rem;
}
</style>
