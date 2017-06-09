<template>
  <div class="kirby-date">
    <div class="kirby-date-selects">
      <kirby-select @input="setDay" ref="day" :value="day" :options="days"></kirby-select>
      <kirby-select @input="setMonth" :value="month" :options="months"></kirby-select>
      <kirby-select @input="setYear" :value="year" :options="years"></kirby-select>
    </div>
    <kirby-calendar v-if="open" @select="select" @click.native.stop></kirby-calendar>
  </div>
</template>

<script>

import KirbyDate from './Date.js';
import Select from '../Select/Select.vue';
import Calendar from '../../Calendar/Calendar.vue';

export default {
  components: {
    'kirby-select': Select,
    'kirby-calendar': Calendar
  },
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

      KirbyDate.days(this.year, this.month, 'numbers').forEach(function(number) {
        options.push({
          value: number, 
          text: number + '.'
        })
      });

      return options;

    },
    months: function() {

      var options = [];

      KirbyDate.months('array').forEach(function(month, index) {          
        options.push({
          value: (index + 1),
          text: month
        });
      });

      return options;

    },
    years: function() {

      var options = [];

      KirbyDate.years(new Date().getFullYear(), 10, 10).forEach(function(year, index) {
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

.kirby-date {
  position: relative;
  background: #fff;
  display: flex;
}
.kirby-date-selects {
  display: flex;
  flex-grow: 1;
}
.kirby-date-selects .kirby-select {
  padding: .5rem 1rem;
  border-left: 1px dashed #ddd;
}
.kirby-date-selects .kirby-select:first-child {
  border-left: 0;
}
.kirby-date-selects .kirby-select:last-child {
  flex-grow: 1;
}
.kirby-date .kirby-calendar {
  position: absolute;
  top: 100%;
  left: 0;
}

</style>
