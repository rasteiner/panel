export default {
  props: {
    value: {}
  },
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
