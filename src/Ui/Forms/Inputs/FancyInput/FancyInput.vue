<template>
  <component :is="tag"
    ref="input"
    contenteditable="true"
    class="kirby-fancy-input"
    spellcheck="false"
    :data-type="type"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.innerText)"
    @focus="focusInput"
    @blur="blurInput"
    @keydown.enter="enter"
    @keydown.delete="remove" v-html="val" />
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Start typing…"
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    focusInput(event) {
      this.$emit("focus", event);
    },
    blurInput(event) {
      this.$emit("blur", event);
    },
    text() {
      return this.$refs.input.innerText;
    },
    enter(e) {
      if (this.multiline === false) {
        e.preventDefault();
      }

      this.$emit("enter", e);
    },
    remove(e) {
      if (window.getSelection().baseOffset <= 1 && this.val.length === 0) {
        e.preventDefault();
        this.$emit("empty");
      }
    }
  }
};
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
.kirby-fancy-input[data-type="headline"] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: calc(100% + 1rem);

  [dir="ltr"] & {
    margin-left: -0.5rem;
  }
  [dir="rtl"] & {
    margin-right: -0.5rem;
  }
}
.kirby-fancy-input[data-type="headline"]:focus {
  @include focus-ring;
  background: #fff;
}
</style>
