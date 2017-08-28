<template>
  <component :is="tag"
    ref="input"
    contenteditable="true"
    class="kirby-fancy-input"
    spellcheck="false"
    v-once
    :placeholder="placeholder"
    @input="input"
    @blur="$emit('blur', $event)"
    @keydown.enter="enter"
    @keydown.delete="remove" v-html="value" />
</template>

<script>

export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Start typing…'
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.innerText);
    },
    focus() {
      this.$refs.input.focus();
      this.emit('focus');
    },
    enter(e) {

      if (this.multiline === false) {
        e.preventDefault();
      }

      this.$emit('enter');

    },
    remove(e) {
      if (window.getSelection().baseOffset <= 1 && this.$el.innerText.length === 0) {
        e.preventDefault();
        this.$emit('empty');
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-fancy-input {
  font: inherit;
  line-height: 1.5em;
  resize: none;
  width: 100%;
  border: 0;
}
.kirby-fancy-input:focus {
  outline: 0;
}
.kirby-fancy-input:empty:before {
  content: attr(placeholder);
  display: block;
  color: $color-light-grey;
}

</style>
