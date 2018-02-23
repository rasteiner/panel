import uniqid from "Ui/Helpers/uniqid.js";

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
      state: this.value
    };
  },
  watch: {
    value(state) {
      this.state = state;
    }
  },
  methods: {
    input(state) {
      this.state = state;
      this.$emit("input", this.state);
    },
    change(state) {
      this.state = state;
      this.$emit("change", this.state);
    }
  }
};
