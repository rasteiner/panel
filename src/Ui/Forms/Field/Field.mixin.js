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
      state: this.value,
      hasChanged: false
    };
  },
  computed: {
    stateValue() {
      return this.state;
    }
  },
  watch: {
    value(state) {
      this.state = state;
    }
  },
  methods: {
    input(state = null) {
      this.state = state;
      this.hasChanged = true;
      this.$emit("input", this.stateValue);
    },
    change() {
      if (this.hasChanged === true) {
        this.$emit("change", this.stateValue);
        this.hasChanged = false;
      }
    }
  }
};
