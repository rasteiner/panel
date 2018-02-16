<template>
  <div class="kirby-time-inputs">
    <kirby-select-input
      ref="hour"
      :options="hours"
      v-model.number="hour"
    />
    <kirby-select-input
      ref="minute"
      :options="minutes"
      v-model.number="minute"
    />
    <kirby-select-input
      v-if="mode === 12"
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

export default {
  props: {
    value: {},
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
      default: true
    },
    override: {
      type: Boolean,
      default: false
    }
  },
  data () {

    var time = {
      hour: 0,
      minute: 0
    }

    if (this.now) {
      const now = new Date();
      time = {
        hour: now.getHours(),
        minute: now.getMinutes(),
      };
    }

    if (this.value && !this.override) {
      time = this.value;
    }

    return {
      hour: this.getHour(parseInt(time.hour)),
      minute: time.minute,
      period: this.getPeriod(parseInt(time.hour))
    }

  },
  mounted () {
    this.minute = this.getMinute(this.minute);
  },
  computed: {
    time () {
      if (this.mode === 12) {
        return `${this.hour.padZero()}:${this.minute.padZero()} ${this.period}`;
      }

      return `${this.hour}:${this.minute}`;
    },
    hours () {

      var options = [];

      const first = this.mode === 24 ? 0 : 1;
      const last = this.mode === 24 ? 23 : 12;

      for (var i = first; i <= last; i++) {
        options.push({
          value: i,
          text:  i.padZero()
        })
      }

      return options;

    },
    minutes () {

      var options = [];

      for (var i = 0; i < 60; i += this.interval) {
        options.push({
          value: i,
          text:  i.padZero()
        })
      }

      return options;

    }
  },
  watch: {
    hour () {
      this.$emit('input', this.time);
    },
    minute () {
      this.$emit('input', this.time);
    },
    period () {
      this.$emit('input', this.time);
    }
  },
  methods: {
    focus () {
      this.$refs.hour.focus();
    },
    getHour (hour) {
      if (this.mode === 24) {
        return hour;
      }

      if (hour > 12) {
        hour -= 12;
      }

      return hour === 0 ? 12 : hour;
    },
    getMinute (minute) {

      var value, last;

      this.minutes.some((item) => {
          var delta = Math.abs(minute - item.value);

          if (delta >= last) {
              return true;
          }

          value = item.value;
          last = delta;
      });

      return value;

    },
    getPeriod (hours) {
      return hours >= 12 ? 'pm' : 'am';
    }
  }
}

</script>

<style lang="scss">

.kirby-time-inputs {
  position: relative;
  display: flex;
  padding-top: .65rem;
  padding-bottom: .65rem;
  flex-grow: 1;
}

.kirby-time-inputs .kirby-select-input:first-child:after {
  content: ':';
  padding: 0 .2rem;
}

.kirby-time-field-switch {
  padding-left: .5rem;
}

</style>
