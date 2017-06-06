<template>
  <div class="kirby-calendar">
    <table class="kirby-calendar-table">
      <caption>
        <span>
          <kirby-button @click="prev" icon="caret-left"></kirby-button>
          <span class="kirby-calendar-selects">
            <kirby-select v-model="date.month" :options="monthOptions"></kirby-select>
            <kirby-select v-model="date.year" :options="yearOptions"></kirby-select>
          </span>
          <kirby-button @click="next" icon="caret-right"></kirby-button>
        </span>
      </caption>
      <thead>
        <tr>
          <th v-for="day in labels.days">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in numberOfWeeks">
          <td v-for="day in days(week)" :aria-current="isToday(day) ? 'date' : false" class="kirby-calendar-day">
            <kirby-button @click="select(day)">{{ day }}</kirby-button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7">
            <kirby-button @click="go('today')">today</kirby-button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>

import Button from '../Button/Button.vue';
import Select from '../Select/Select.vue';

export default {
  props: ['month', 'year'],
  components: {
    'kirby-button': Button,
    'kirby-select': Select
  },
  data: function() {

    var today = new Date();

    return {
      date: {
        year: this.year || today.getFullYear(),
        month: this.month ? (this.month - 1) : today.getMonth(),
      },
      today: today,
      daysInMonths: [
        31, 
        28, 
        31, 
        30, 
        31, 
        30, 
        31, 
        31, 
        30, 
        31, 
        30, 
        31
      ],
      labels: {
        days: [
          'M', 
          'T', 
          'W', 
          'T', 
          'F', 
          'S',
          'S' 
        ],
        months: [
          'January', 
          'February', 
          'March', 
          'April',
          'May', 
          'June', 
          'July', 
          'August', 
          'September',
          'October', 
          'November', 
          'December'
        ]
      }
    }
  },
  computed: {
    startingDay: function() {
      return new Date(this.date.year, this.date.month, 1).getDay();
    },
    numberOfDays: function() {

      // leap years
      if(this.date.month === 0) { 
        if((this.date.year % 4 === 0 && this.date.year % 100 !== 0) || this.date.year % 400 === 0) {
          return 29;
        }
      }
      
      return this.daysInMonths[this.date.month];

    },
    numberOfWeeks: function() {


      var first = new Date(this.date.year, this.date.month, 1);
      var last  = new Date(this.date.year, this.date.month, 0);      
      var used  = first.getDay() + 6 + last.getDate();

      return (Math.ceil(used / 7) - 1);

    },
    monthOptions: function() {
      var options = [];

      this.labels.months.forEach(function(item, index) {
        options.push({
          value: index,
          text: item
        });
      });      

      return options;

    },
    yearOptions: function() {

      var options = [];
      var year    = this.today.getFullYear();

      for(var x = (year - 30); x < (year + 30); x++) {
        options.push({
          value: x,
          text: x
        });
      }

      return options;

    }
  }, 
  methods: {
    days: function(week) {

      var days  = [];
      var start = ((week-1) * 7) + 1;
      var end   = (start + 7);

      for(var x = start; x < end; x++) {

        var day = x - (this.startingDay - 1);

        if(day <= 0) {
          days.push('');          
        } else if(day > this.numberOfDays) {
          days.push('');          
        } else {
          days.push(day);
        }
      }

      return days;

    },
    next: function() {
      if(this.date.month == 11) {
        this.date.year  = (this.date.year + 1);
        this.date.month = 0;
      } else {
        this.date.month = this.date.month + 1;        
      }
    },
    isToday: function(day) {

      if(this.date.month === this.today.getMonth() && this.date.year == this.today.getFullYear()) {
        return this.today.getDate() == day;        
      }

    },
    prev: function() {
      if(this.date.month == 0) {
        this.date.year  = (this.date.year - 1);
        this.date.month = 11;
      } else {
        this.date.month = this.date.month - 1;        
      }
    },
    go: function(year, month) {
      if(year === 'today') {
        year  = this.today.getFullYear();
        month = this.today.getMonth();
      } 

      this.date.year  = year;
      this.date.month = month;

    },
    select: function(day) {
      this.$emit('select', new Date(this.date.year, this.date.month, day));
    }
  }
}

</script>

<style>

.kirby-calendar {
  background: #000;
  color: #fff;
  border-radius: 3px;
  display: inline-block;
}
.kirby-calendar-table {
  table-layout: fixed;
  padding: 1rem;
}
.kirby-calendar caption > span {
  display: flex;
}
.kirby-calendar caption .kirby-button {
  padding: .5rem;
}
.kirby-calendar-selects {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
.kirby-calendar-selects .kirby-select {
  padding: .5rem;
  font-weight: 500;
}
.kirby-calendar th {
  font-weight: 400;
  color: #999;
  padding: .25rem;
}
.kirby-calendar td,
.kirby-calendar th {
  text-align: right;
}
.kirby-calendar-day .kirby-button {
  padding: .25rem;
}
.kirby-calendar-day[aria-current="date"] {
  color: #8dae28;
}
.kirby-calendar tfoot td {
  text-align: center;
  padding: 2rem 0 0;
}

</style>
