




// Range field

panel.field('range', {
  template: '<kirby-field v-bind="$props"><div class="kirby-range-input"><input type="range" :min="min" :max="max" :step="step" v-model.number="data" /><span>{{ before }} {{ display }} {{ after }}</span></div></kirby-field>',

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    },
    before: {
      type: String
    },
    after: {
      type: String
    },

    // for the kirby-field component
    label: {
      default: 'Range'
    },
    name: {
      default: 'range'
    }
  },
  computed: {
    // either show value or a placeholder in tooltip
    display: function () {
      return this.value || '–';
    }
  }
})
