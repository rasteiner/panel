<template>
  <kirby-block class="kirby-text-block"
    @append="append"
    @remove="remove">
    <kirby-fancy-input
      ref="input"
      @enter="enter"
      @input="input"
      @empty="empty"
      :placeholder="placeholder"
      :multiline="multiline"
      :value="value" />
  </kirby-block>
</template>

<script>

export default {
  props: {
    value: {},
    placeholder: {
      type: String,
      default: 'Type something …'
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    input(value) {
      this.$emit('input', value);
    },
    enter() {
      if (this.multiline === false) {
        this.$emit('append', 'text');
      }
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

</script>

<style lang="scss">

.kirby-text-block {
  margin-bottom: 1.5rem;
}

</style>
