<template>
  <kirby-field class="kirby-datetime-field" v-bind="$props">
    <kirby-date-input v-bind="date" v-model="date.data" />
    <kirby-time-input v-bind="time" v-model="time.data" />
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
    date: {
      type: Object,
      default: () => ({
        data: null
      })
    },
    time: {
      type: Object,
      default: () => ({
        data: null
      })
    }
  },
  computed: {
    datetime () {
      return date.data + ' ' + time.data;
    }
  },
  watch: {
    datetime () {
      this.$input('input', this.datetime)
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
