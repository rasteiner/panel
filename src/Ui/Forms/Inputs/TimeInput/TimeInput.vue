<template>
  <div class="kirby-time-inputs">
    <kirby-select-input
      ref="hour"
      :options="times.hours(hours)"
      :disabled="disabled"
      v-model.number="hour"
    />
    <kirby-select-input
      ref="minute"
      :options="times.minutes(step)"
      :disabled="disabled"
      v-model.number="minute"
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
    disabled: Boolean,
    hours: {
      type: Number,
      default: 24
    },
    step: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      hour: Times.hour(this.value.getHours(), this.hours),
      minute: this.value.getMinutes(),
      period: this.value.getHours() >= 12 ? "pm" : "am"
    };
  },
  mounted() {
    this.minute = Times.minute(this.minute, this.step);
  },
  computed: {
    time() {
      return Times.asDate({
        hour: this.hour,
        minute: this.minute,
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

.kirby-time-inputs .kirby-select-input:first-child:after {
  content: ":";
  padding: 0 0.2rem;
}

.kirby-time-field-switch {
  padding-left: 0.5rem;
}
</style>
