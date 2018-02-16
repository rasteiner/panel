export default {
  props: {
    value: {},
    name: {
      type: String
    }
  },
  data() {
    return {
      state: this.value
    };
  },
  methods: {
    input(state) {
      this.state = state;
      this.$emit("input", this.state);
    }
  }
};
