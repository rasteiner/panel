
import Props from '../Input.props.js';

export default {
  mixins: [Props],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: [String, Boolean],
      default: 'off'
    }
  }
}
