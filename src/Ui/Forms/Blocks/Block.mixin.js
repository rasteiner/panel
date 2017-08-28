export default {
  props: ['value'],
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    input(value) {
      this.$emit('input', value);
    },
    enter() {
      this.$emit('append', 'text');
    },
    append(type) {
      this.$emit('append', type);
    },
    remove() {
      this.$emit('remove');
    },
    empty() {
      this.$emit('remove');
    }
  }
}
