<template>
  <kirby-field class="kirby-datetime-field" v-bind="fieldProps">
    <kirby-date-input
      ref="date"
      v-bind="date"
      :value="value ? value.date : null"
      @input="$emit('input', datetime)" />
    <kirby-time-input
      ref="time"
      v-bind="time"
      :value="value ? value.time : null"
      @input="$emit('input', datetime)" />
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      default: 'datetime'
    },
    label: {
      default: 'Datetime'
    },
    icon: {
      default: 'calendar'
    },
    date: {},
    time: {}
  },
  computed: {
    datetime () {
      const date = this.$refs.date.date;
      var time = this.$refs.time.time;
      const mode = time.split(' ');

      // am/pm mode
      if (mode.length > 1) {
        time = mode[0];
      }

      // split hours and minutes
      time = time.split(':');

      // convert hour to 24h format
      if (mode.length > 1) {
        if (mode[1] === 'pm' && time[0] < 12) {
            time[0] = parseInt(time[0]) + 12;
        } else if (mode[1] === 'am' && time[0] === 12) {
            time[0] = 0
        }
      }

      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1]);

    }
  }
}

</script>

<style lang="scss">

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

</style>
