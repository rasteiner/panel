<template>
  <kirby-field class="kirby-datetime-field" v-bind="$props">
    <kirby-date-input v-bind="date" :value="data.date" @input="setDate" />
    <kirby-time-input v-bind="time" :value="data.time" @input="setTime" />
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
      data: {
        date: this.value ? this.value.date : null,
        time: this.value ? this.value.time : null
      }
    }

  },
  methods: {
    setDate (date) {
      this.data.date = date;
      this.$emit('input', this.data)
    },
    setTime(time) {
      this.data.time = time;
      this.$emit('input', this.data)
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
