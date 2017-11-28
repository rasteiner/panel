
export default {
  props: {
    value: {},
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    label: {
      type: String,
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    help: {
      type: String,
      default: ''
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
    }
  },
  data () {
    return {
      data: this.value
    }
  },
  watch: {
    data () {
      this.$emit('input', this.data)
    },
    value () {
      this.data = this.value;
    }
  }
}
