import Vue from 'vue'
import { DateTime } from 'luxon'
import store from '../Store/Store.js';


Vue.filter('date', (value, output) => {

  if (!value) {
    return value
  }

  var dt
  if (Array.isArray(value)) {
    dt = DateTime.fromString(value[0], value[1])
  } else {
    dt = DateTime.fromISO(value)
  }

  return dt.
          setLocale(store.state.language.locale).
          toLocaleString(typeof output === 'string' ? DateTime[output] : output)

});
