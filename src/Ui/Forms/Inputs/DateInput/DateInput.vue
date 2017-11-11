<template>
  <div class="kirby-date-inputs">
    <kirby-select-input v-model="day" ref="day" :options="days" />
    <kirby-select-input v-model="month" :options="months" />
    <kirby-select-input v-if="range !== false" v-model="year" :options="years" />
    <kirby-text-input v-else v-model.number="year" />
  </div>
</template>

<script>

import Dates from './DateInput.dates.js';

export default {
  props: {
    value: {},
    range: {
      type: [Boolean, Number],
      default: 10
    }
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
  mounted () {
    document.addEventListener('click', () => {
      this.open = false;
    });
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

      if (this.range) {
        Dates.years(this.date.getFullYear(), this.range, this.range, 10).forEach((year, index) => {
          options.push({
            value: year,
            text: year
          });
        });
      }


      return options;

    }
  },
  watch: {
    year () {
      this.$emit('input', this.date);
    },
    month () {
      this.$emit('input', this.date);
    },
    day () {
      this.$emit('input', this.date);
    }
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

.kirby-date-inputs .kirby-text-input {
  font-size: 100%;
  border: 0;
  outline: none;
}

</style>

