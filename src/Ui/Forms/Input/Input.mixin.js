export default {
  props: {
    value: {},
    id: [String, Number],
    name: {
      type: String
    }
  },
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
    }
  }
};
