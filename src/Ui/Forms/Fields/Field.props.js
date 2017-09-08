
import Input from '../Inputs/Input.props.js';

export default {
  mixin: [Input],
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    help: {
      type: String,
      default: ''
    },
    value: {}
  },
  data () {
    return {
      data: this.value
    }
  },
  watch: {
    data () {
      this.$emit('input', this.data)
    }
  },
  methods: {
    input (data) {
      this.data = data
    }
  }
}
