<template>
  <textarea
    ref="textarea"
    spellcheck="false"
    class="kirby-textarea-input"
    @input="$emit('input', $event.target.value)"
    @keydown.delete="remove($event)"
    @keydown.enter="enter($event)"
    :placeholder="placeholder"
    :value="value">
  </textarea>
</template>

<script>

import autosize from './TextareaInput.autosize.js';

export default {
  props: {
    value: String,
    autosize: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    multiline: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    focus () {
      this.$refs.textarea.focus();
    },
    enter (e) {
      this.$emit('enter', e);

      if (this.multiline === false) {
        e.preventDefault();
      }

    },
    remove (e) {

      if (e.target.selectionStart === 0 && e.target.value.length === 0) {
        this.$emit('empty');
        e.preventDefault();
      }

      this.$emit('remove', e);
    }
  },
  mounted () {
    this.$nextTick(() => {
      autosize(this.$el);
    });
  }
}

</script>

<style lang="scss">

.kirby-textarea-input {
  font: inherit;
  line-height: 1.5em;
  resize: none;
  width: 100%;
  background: none;
  border: 0;
}
.kirby-textarea-input:focus {
  outline: 0;
  max-height: none;
}

@media screen and (max-width: $breakpoint-medium) {
  .kirby-textarea-input {
    max-height: 2rem;
  }
}


</style>
