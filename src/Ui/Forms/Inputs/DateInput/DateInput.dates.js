// All methods are to be called with actual year, month, day numbers
// 1 = January, 2 = February …

export default {
  labels: {
    // TODO: get them from Locales file
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    days_short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },

  years(start, past = 10, future = 10) {
    var years = [];

    for (var x = start - past; x <= start + future; x++) {
      years.push(x);
    }

    return years;
  },
  months(type) {
    switch (type) {
      case "count":
        return 12;
      case "numbers":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      case "labels":
        return this.labels.months;
      case "object":
        var months = {};

        this.labels.months.forEach((month, index) => {
          months[index + 1] = month;
        });

        return months;
    }
  },
  days(year, month, type) {
    switch (type) {
      case "count":
        // leap years
        if (month === 2) {
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return 29;
          }
        }

        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return days[month - 1];

      case "numbers":
        var count = this.days(year, month, "count");
        days = [];

        for (var x = 1; x <= count; x++) {
          days.push(x);
        }

        return days;
    }
  },
  weeks(year, month) {
    let first = new Date(year, month - 1, 1).getDay();

    // since we are using Sunday as last day of the week
    if (first === 0) {
      first = 7;
    }

    let last = new Date(year, month, 0).getDate();

    return Math.ceil((last + first - 1) / 7);
  }
};
