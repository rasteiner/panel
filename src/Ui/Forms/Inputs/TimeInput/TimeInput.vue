<template>
  <div class="kirby-time-inputs">
    <kirby-select-input ref="hour" v-model="hour" :options="hours" />
    <kirby-select-input ref="minute" v-model="minute"  :options="minutes" />
    <kirby-select-input class="kirby-time-field-switch" v-if="mode === 12" ref="period" v-model="period" :options="[
      { value: 'am', text: 'am' },
      { value: 'pm', text: 'pm' },
    ]" />
  </div>
</template>

<script>

export default {
  props: {
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
  },
  data () {

    var date = new Date();

    if (this.value) {
      date = new Date(this.value);
    }

    return {
      date: date,
      hour: this.getHours(date),
      minute: date.getMinutes(),
      period: this.getPeriod(date)
    }

  },
  mounted () {
    this.minute = this.getMinutes(this.date);
  },
  computed: {
    time () {
      return `${this.hour}:${this.minute} ${this.period}`;
    }
  },
  watch: {
    time (time) {
      this.$emit('input', time);
    }
  },
  methods: {
    focus () {
      this.$refs.hour.focus();
    },
    getHours (date) {
      if (this.mode === 24) {
        return date.getHours();
      }
      return date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
    },
    getMinutes (date) {
      return this.closest(date.getMinutes());
    },
    getPeriod (date) {
      return date.getHours() > 12 ? 'pm' : 'am';
    },
    select (date) {
      this.hour   = this.getHours(date);
      this.minute = this.getMinutes(date);
      this.period = this.getPeriod(date);
    },
    closest(minute) {
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
    }
  },
  computed: {
    hours () {

      var options = [];

      for (var i = 1; i <= (this.mode === 24 ? 23 : 12); i++) {
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
