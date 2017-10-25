<template>
  <div class="kirby-date-inputs">
    <kirby-select-input @input="setDay" ref="day" :value="day" :options="days" />
    <kirby-select-input @input="setMonth" :value="month" :options="months" />
    <kirby-select-input @input="setYear" :value="year" :options="years" />
  </div>
</template>

<script>

import Dates from './DateInput.dates.js';

export default {
  props: {
    value: {}
  },
  data () {

    var date = new Date();

    if (this.value) {
      date = new Date(this.value);
    }

    return {
      open: false,
      day: date.getDate(),
      month: (date.getMonth() + 1),
      year: date.getFullYear()
    }

  },
  computed: {
    date () {
      return new Date(this.year, this.month - 1, this.day, 1, 0);
    },
    days () {

      var options = [];

      Dates.days(this.year, this.month, 'numbers').forEach((day) => {
        day = day.padZero();
        options.push({
          value: day,
          text: day
        })
      });

      return options;

    },
    months () {

      var options = [];

      Dates.months('array').forEach((monthName, month) => {
        month = (month + 1).padZero();
        options.push({
          value: month,
          text: month
        });
      });

      return options;

    },
    years () {

      var options = [];

      Dates.years(this.date.getFullYear(), 10, 10).forEach((year, index) => {
        options.push({
          value: year,
          text: year
        });
      });

      return options;

    }
  },
  mounted () {
    document.addEventListener('click', () => {
      this.open = false;
    });
  },
  methods: {
    focus () {
      this.$refs.day.focus();
    },
    select (date) {
      this.day   = date.getDate();
      this.month = date.getMonth() + 1;
      this.year  = date.getFullYear();
      this.open  = false;
    },
    setDay (day) {
      this.day = day;
      this.$emit('input', this.date);
    },
    setMonth (month) {
      this.month = month;
      this.$emit('input', this.date);
    },
    setYear (year) {
      this.year = year;
      this.$emit('input', this.date);
    }
  }
}

</script>

<style lang="scss">

.kirby-date-inputs {
  position: relative;
  display: flex;
  flex-grow: 1;
}

.kirby-date-inputs .kirby-select-input {
  padding: .65rem 0 .65rem;
  min-height: 2.5rem;
}
.kirby-date-inputs .kirby-select-input:after {
  content: '.';
  padding: 0 .1rem;
}
.kirby-date-inputs .kirby-select-input:first-child {
  [dir="ltr"] & {
    padding-left: .5rem;
  }
  [dir="rtl"] & {
    padding-right: .5rem;
  }
}
.kirby-date-inputs.kirby-select-input:last-child {
  flex-grow: 1;
}
.kirby-date-inputs .kirby-select-input:last-child:after {
  display: none;
}


</style>
