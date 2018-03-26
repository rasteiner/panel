export default {
  props: {
    name: {
      type: String,
      required: true
    },
    error: [Object, Boolean],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  methods: {
    setFocus() {
      this.$el.querySelectorAll("input, textarea, select")[0].focus();
    }
  }
};
