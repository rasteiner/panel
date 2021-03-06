export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {},

    // elements
    label: String,
    icon: {
      type: [Boolean, String],
      default: false
    },
    error: [Object, Boolean],
    help: {
      type: String,
      default: ""
    },

    // states
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  data() {
    return {
      state: this.toState(this.value),
      hasChanged: false
    };
  },
  computed: {
    toValue() {
      return this.state;
    }
  },
  watch: {
    value(value) {
      this.state = this.toState(value);
    }
  },
  methods: {
    input(value) {
      if (this.disabled === false) {
        this.state = value;
        this.hasChanged = true;
        this.$emit("input", this.toValue);
      }
    },
    setFocus() {
      this.$el.querySelectorAll("input, textarea, select")[0].focus();
    },
    change() {
      if (this.hasChanged === true) {
        this.$emit("change", this.toValue);
        this.hasChanged = false;
      }
    },
    toState(value) {
      return value;
    }
  }
};
