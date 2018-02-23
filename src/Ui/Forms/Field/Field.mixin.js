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
    readonly: {
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
      state: this.setValue(this.value),
      hasChanged: false
    };
  },
  computed: {
    stateToValue() {
      return this.state;
    }
  },
  watch: {
    value(state) {
      this.state = this.setValue(state);
    }
  },
  methods: {
    input(state = null) {
      this.state = state;
      this.hasChanged = true;
      this.$emit("input", this.stateToValue);
    },
    change() {
      if (this.hasChanged === true) {
        this.$emit("change", this.stateToValue);
        this.hasChanged = false;
      }
    },
    setValue(value) {
      return value;
    }
  }
};
