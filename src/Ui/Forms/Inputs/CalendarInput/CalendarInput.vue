<template>
  <div class="kirby-calendar-input">

    <nav>
      <kirby-button @click="prev" icon="angle-left" />
      <span class="kirby-calendar-selects">
        <kirby-select-input
          :options="monthOptions"
          v-model.number="month"
        />
        <kirby-select-input
          :options="yearOptions"
          v-model.number="year"
        />
      </span>
      <kirby-button @click="next" icon="angle-right" />
    </nav>

    <table class="kirby-calendar-table">

      <thead>
        <tr>
          <th v-for="day in labels.days" :key="'weekday_' + day">{{ day }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="week in numberOfWeeks" :key="'week_' + week">
          <td
            v-for="day in days(week)"
            :key="'day_' + day"
            :aria-current="isToday(day) ? 'date' : false"
            class="kirby-calendar-day">
            <kirby-button @click="select(day)">{{ day }}</kirby-button>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td class="kirby-calendar-today" colspan="7">
            <kirby-button @click="go('today')">today</kirby-button>
          </td>
        </tr>
      </tfoot>

    </table>

  </div>
</template>

<script>
import Dates from "../DateInput/DateInput.dates.js";

export default {
  props: {
    current: {}
  },
  data() {
    var today = new Date();
    var date = this.current ? new Date(this.current) : today;

    return {
      open: false,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      today: today
    };
  },
  watch: {
    current(date) {
      if (date.getDate === undefined) {
        return false;
      }

      this.day = date.getDate();
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
    }
  },
  computed: {
    date() {
      let date = new Date(this.year, this.month - 1, this.day, 1, 0);
      return date;
    },
    startingDay() {
      let day = new Date(this.year, this.month - 1, 1).getDay();

      if (day === 0) {
        return 7;
      }

      return day;
    },
    numberOfDays() {
      return Dates.days(this.year, this.month, "count");
    },
    numberOfWeeks() {
      return Dates.weeks(this.year, this.month);
    },
    labels() {
      return {
        days: Dates.labels.days_short,
        months: Dates.labels.months
      };
    },
    monthOptions() {
      var options = [];

      this.labels.months.forEach((item, index) => {
        options.push({
          value: index + 1,
          text: item
        });
      });

      return options;
    },
    yearOptions() {
      var options = [];

      Dates.years(this.today.getFullYear()).forEach(year => {
        options.push({
          value: year,
          text: year
        });
      });

      return options;
    }
  },
  methods: {
    days(week) {
      var days = [];
      var start = (week - 1) * 7 + 1;
      var end = start + 7;

      for (var x = start; x < end; x++) {
        var day = x - (this.startingDay - 1);
        if (day <= 0) {
          days.push("");
        } else if (day > this.numberOfDays) {
          days.push("");
        } else {
          days.push(day);
        }
      }

      return days;
    },
    next() {
      if (this.month == 12) {
        this.year = this.year + 1;
        this.month = 1;
      } else {
        this.month = this.month + 1;
      }
    },
    isToday(day) {
      if (
        this.month === this.today.getMonth() &&
        this.year == this.today.getFullYear()
      ) {
        return this.today.getDate() == day;
      }
    },
    prev() {
      if (this.month == 1) {
        this.year = this.year - 1;
        this.month = 12;
      } else {
        this.month = this.month - 1;
      }
    },
    go(year, month) {
      if (year === "today") {
        year = this.today.getFullYear();
        month = this.today.getMonth();
      }

      this.year = year;
      this.month = month;
    },
    select(day) {
      this.day = day;
      this.$emit("input", this.date);
    }
  }
};
</script>

<style lang="scss">
$cell-padding: 0.2rem;

.kirby-calendar-input {
  padding: 0.5rem;
  background: $color-dark;
  color: $color-light;
  border-radius: $border-radius;
}

.kirby-calendar-table {
  table-layout: fixed;
}

.kirby-calendar-input > nav {
  display: flex;

  .kirby-button {
    padding: 0.5rem;
  }

  .kirby-icon svg * {
    fill: $color-white;
  }
}

.kirby-calendar-selects {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
.kirby-calendar-selects .kirby-select-input {
  padding: 0.5rem;
  font-weight: 400;
}
.kirby-calendar-input th {
  padding: $cell-padding;
  color: $color-light-grey;
  font-size: 0.8em;
  font-family: $font-family-mono;
  text-transform: uppercase;
}
.kirby-calendar-input td,
.kirby-calendar-input th {
  [dir="ltr"] & {
    text-align: right;
  }
  [dir="rtl"] & {
    text-align: left;
  }
}
.kirby-calendar-day .kirby-button {
  padding: $cell-padding;
  color: $color-light-grey;
}
.kirby-calendar-table .kirby-button:hover {
  color: $color-white;
}
.kirby-calendar-day[aria-current="date"] .kirby-button-text {
  color: $color-notice;
}
.kirby-calendar-day[aria-selected="date"] .kirby-button-text {
  background: $color-focus;
}
.kirby-calendar-input tfoot td {
  text-align: center;
  padding: 1rem 0 0;
}
.kirby-calendar-today .kirby-button {
  color: $color-light-grey;
}
</style>
