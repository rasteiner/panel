export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    hasOptions() {
      return this.options && this.options.length > 0;
    }
  }
};
