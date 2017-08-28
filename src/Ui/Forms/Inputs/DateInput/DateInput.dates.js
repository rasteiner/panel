export default {

  i18n: {
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
    ],
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
  },

  years: function(start, past, future) {
    past   = past || 10;
    future = future || 10;

    var years  = [];

    for(var x = (start - past); x <= (start + future); x++) {
      years.push(x);
    }

    return years;

  },

  months: function(type) {

    switch(type) {
      case 'count':
        return 12;
      case 'numbers':
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      case 'array':
        return this.i18n.months;
      case 'object':

        var months = {};

        this.i18n.months.forEach(function(month, index) {
          months[index + 1] = month;
        });

        return months;
    }

  },

  days: function(year, month, type) {

    switch(type) {
      case 'count':

        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // leap years
        if(month === 2) {
          if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return 29;
          }
        }

        return days[month-1];

      case 'numbers':
        var count = this.days(year, month, 'count');
        days  = [];

        for(var x = 1; x <= count; x++) {
          days.push(x);
        }

        return days;

    }

  },

  weeks: function(year, month) {

    var first = new Date(year, month, 1);
    var last  = new Date(year, month, 0);
    var used  = first.getDay() + 6 + last.getDate();

    return (Math.ceil(used / 7) - 1);

  }

};
