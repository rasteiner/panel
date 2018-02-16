export default {
  props: {
    value: {},
    name: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    label: {
      type: String
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    help: {
      type: String,
      default: ""
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
      state: this.value
    };
  },
  computed: {
    fieldProps() {
      return {
        name: this.name,
        label: this.label,
        icon: this.icon,
        help: this.help,
        required: this.required,
        readonly: this.readonly
      };
    }
  },
  methods: {
    input(state) {
      this.state = state;
      this.$emit("input", this.state);
    }
  }
};
