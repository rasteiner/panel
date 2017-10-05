export default {
  props: {
    value: {},
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    input (event) {
      this.$emit('input', event.target.value)
    }
  }
}
