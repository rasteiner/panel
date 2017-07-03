import FancyInput from '../Inputs/FancyInput/FancyInput.vue';
import Block from './Block.vue';

export default {
  components: {
    'kirby-fancy-input': FancyInput,
    'kirby-block': Block
  },
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
