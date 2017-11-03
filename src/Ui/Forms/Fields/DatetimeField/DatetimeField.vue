<template>
  <kirby-field class="kirby-datetime-field" v-bind="$props">
    <kirby-date-input v-bind="date" :value="selDate" @input="setDate" ref="date" />
    <kirby-time-input v-bind="time" :value="selTime" @input="setTime" ref="time" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

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
  data () {

    return {
      selDate: this.value ? this.value.date : null,
      selTime: this.value ? this.value.time : null
    }

  },
  computed: {
    datetime () {

      const mode = this.selTime.split(' ');
      if (mode.length > 1) {
        var hour = mode[0].split(':')[0];
        var minute = mode[0].split(':')[1];

        if (mode[1] === 'pm') {
          if (hour < 12) {
            hour = parseInt(hour) + 12;
          }
        } else {
          if (hour === 12) {
            hour = 0
          }
        }

      } else {
        var hour = this.selTime.split(':')[0];
        var minute = this.selTime.split(':')[1];
      }

      return new Date(this.selDate.getFullYear(), this.selDate.getMonth(), this.selDate.getDate(), hour, minute);

    }
  },
  mounted () {
    this.selDate = this.$refs.date.date;
    this.selTime = this.$refs.date.time;
  },
  methods: {
    setDate (date) {
      this.selDate = date;
      this.$emit('input', this.datetime)
    },
    setTime(time) {
      this.selTime = time;
      this.$emit('input', this.datetime)
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
