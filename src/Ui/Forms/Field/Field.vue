<template>
  <div class="kirby-field" :data-readonly="readonly" :data-error="error !== false">

    <kirby-bar v-if="$slots.label || $slots.options || label" class="kirby-field-header">

      <template slot="left">
        <slot name="label">
          <label :for="id">{{ label }}</label>
        </slot>
      </template>

      <template slot="right">
        <slot name="options" />
      </template>

    </kirby-bar>

    <slot v-if="$slots.content" name="content" />
    <kirby-input v-else :error="error" :icon="$attrs.icon" :prefix="$attrs.prefix" :hasFocus="hasFocus" @icon="icon">
      <slot />
      <slot v-if="$slots.icon" slot="icon" name="icon" />
    </kirby-input>

    <div v-if="$slots.help || help" class="kirby-field-help">
      <slot name="help">
        <p>{{ help }}</p>
      </slot>
    </div>

    <div v-if="error" class="kirby-field-error">
      {{ error.message }}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    error: [Object, Boolean],
    help: String,
    label: String,
    id: [String, Number],
    name: {
      type: String,
      required: true
    },
    readonly: Boolean,
    required: Boolean
  },
  inheritAttrs: false,
  data() {
    return {
      hasFocus: false
    };
  },
  created() {
    window.addEventListener("click", this.focusIn);
    window.addEventListener("focusin", this.focusIn);
  },
  destroyed() {
    window.removeEventListener("click", this.focusIn);
    window.removeEventListener("focusin", this.focusIn);
  },
  methods: {
    icon() {
      this.$emit("icon");
    },
    focus() {
      this.hasFocus = true;
      this.$emit("focus");
    },
    blur() {
      this.hasFocus = false;
      this.$emit("blur");
    },
    focusIn(e) {
      // focussing or clicking on another element
      if (
        this.hasFocus === true &&
        this.$el.contains(e.target) === false &&
        this.$el !== e.target
      ) {
        this.blur();

        // focussing or clicking on this field
      } else if (
        this.hasFocus === false &&
        (this.$el.contains(e.target) === true || this.$el === e.target)
      ) {
        this.focus();
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-field-header label {
  display: block;
  font-weight: 500;
  line-height: 1.5em;
  padding: 1rem 0;
  margin-bottom: -1px;
}
.kirby-field-header label abbr {
  color: $color-focus;
  text-decoration: none;
  padding: 0 0.25rem;
}

.kirby-field[data-readonly] {
  cursor: default;
  pointer-events: none;
}
.kirby-field[data-readonly] .kirby-input {
  background: $color-background;
}
.kirby-field[data-error] .kirby-field-header label {
  color: $color-negative;
}
.kirby-field[data-error] .kirby-field-header label abbr {
  color: $color-negative;
}

.kirby-field-help,
.kirby-field-error {
  padding: 0.5rem 0;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  color: $color-dark-grey;
  line-height: 1.5;
}
.kirby-field-error {
  color: $color-negative;
}
</style>
