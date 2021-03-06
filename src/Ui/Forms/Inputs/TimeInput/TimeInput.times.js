export default {
  fromString(string) {
    const parts = string.split(" ");
    const military = parts.length === 1;

    let time = (military ? string : parts[0]).split(":");

    return {
      hour: time[0],
      minute: time[1],
      period: military ? null : parts[1],
      military: military
    };
  },
  toDate(string) {
    if (!string) {
      return new Date();
    }

    return this.asDate(this.fromString(string));
  },
  asDate(time) {
    return new Date(
      2000,
      0,
      1,
      this.military ? time.hour : this.convert12hTo24h(time.hour, time.period),
      time.minute
    );
  },
  convert12hTo24h(hour, period) {
    if (period === "pm" && hour < 12) {
      return parseInt(hour) + 12;
    } else if (period === "am" && hour === 12) {
      return 0;
    }
    return hour;
  },
  hour(hour, hours) {
    if (hours === 24) {
      return hour;
    }

    if (hour > 12) {
      hour -= 12;
    }

    return hour === 0 ? 12 : hour;
  },
  hours(total) {
    var options = [];

    const first = total === 24 ? 0 : 1;
    const last = total === 24 ? 23 : 12;

    for (var i = first; i <= last; i++) {
      options.push({
        value: i,
        text: i.padZero()
      });
    }

    return options;
  },
  minute(minute, step) {
    var value, last;

    this.minutes(step).some(item => {
      var delta = Math.abs(minute - item.value);

      if (delta >= last) {
        return true;
      }

      value = item.value;
      last = delta;
    });

    return value;
  },
  minutes(step) {
    var options = [];

    for (var i = 0; i < 60; i += step) {
      options.push({
        value: i,
        text: i.padZero()
      });
    }

    return options;
  }
};
