
export default {
  props: {
    value: {},
    name: {
      type: String,
      required: true,
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
  data() {
    return {
      model: this.value
    }
  },
  computed: {
    fieldProps () {
      return {
        name: this.name,
        label: this.label,
        help: this.help,
        required: this.required,
        icon: this.icon,
        readonly: this.readonly
      };
    }
  }
}
