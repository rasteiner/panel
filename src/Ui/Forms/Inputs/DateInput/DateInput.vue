<template>
  <div class="kirby-date-input">
    <div class="kirby-date-input-selects">
      <kirby-select-input @input="setDay" ref="day" :value="day" :options="days"></kirby-select-input>
      <kirby-select-input @input="setMonth" :value="month" :options="months"></kirby-select-input>
      <kirby-select-input @input="setYear" :value="year" :options="years"></kirby-select-input>
    </div>
  </div>
</template>

<script>

import Dates from './DateInput.dates.js';

export default {
  props: ['value'],
  data: function() {

    var date = new Date();

    return {
      open: false,
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear()
    }

  },
  mounted: function() {
    document.addEventListener('click', function() {
      this.open = false;
    }.bind(this));
  },
  methods: {
    focus: function() {
      this.$refs.day.focus();
    },
    date: function() {
      return new Date(this.year, this.month - 1, this.day, 1, 0);
    },
    select: function(date) {

      this.day   = date.getDate();
      this.month = date.getMonth() + 1;
      this.year  = date.getFullYear();
      this.open = false;

    },
    setDay: function(day) {
      this.day = day;
      this.$emit('input', this.date());
    },
    setMonth: function(month) {
      this.month = month;
      this.$emit('input', this.date());
    },
    setYear: function(year) {
      this.year = year;
      this.$emit('input', this.date());
    }
  },
  computed: {
    days: function() {

      var options = [];

      Dates.days(this.year, this.month, 'numbers').forEach(function(day) {
        day = day.padZero();
        options.push({
          value: day,
          text: day
        })
      });

      return options;

    },
    months: function() {

      var options = [];

      Dates.months('array').forEach(function(monthName, month) {
        month = (month + 1).padZero();
        options.push({
          value: month,
          text: month
        });
      });

      return options;

    },
    years: function() {

      var options = [];

      Dates.years(new Date().getFullYear(), 10, 10).forEach(function(year, index) {
        options.push({
          value: year,
          text: year
        });
      });

      return options;

    }
  }
}

</script>

<style lang="scss">

.kirby-date-input {
  position: relative;
  background: $color-white;
  display: flex;
}
.kirby-date-input-selects {
  display: flex;
  flex-grow: 1;
}
.kirby-date-input-selects .kirby-select-input {
  padding: .65rem 0 .65rem;
  min-height: 2.5rem;
}
.kirby-date-input-selects .kirby-select-input:after {
  content: '.';
  padding: 0 .1rem;
}
.kirby-date-input-selects .kirby-select-input:first-child {
  padding-left: .5rem;
}
.kirby-date-input-selects .kirby-select-input:last-child {
  flex-grow: 1;
}
.kirby-date-input-selects .kirby-select-input:last-child:after {
  display: none;
}

</style>
