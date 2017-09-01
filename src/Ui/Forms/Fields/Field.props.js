export default {
  props: {
    'label': {
      type: String,
      default: ''
    },
    'icon': {
      default: false
    },
    'name': {
      type: String,
      default: ''
    },
    'value': {
      type: String,
      default: ''
    },
    'required': {
      type: Boolean,
      default: false
    },
    'readonly': {
      type: Boolean,
      default: false
    },
    'autofocus': {
      type: Boolean,
      default: false
    },
    'help': {
      type: String,
      default: ''
    },
    'type': {
      type: String,
      default: 'text'
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
