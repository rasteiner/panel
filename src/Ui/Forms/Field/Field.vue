<template>
  <div class="kirby-field" :data-readonly="readonly" :data-error="error" @click="focus">

    <kirby-bar v-if="$slots.label || $slots.options || label" class="kirby-field-header">

      <template slot="left">
        <slot name="label">
          <label :for="name">{{ label }} <abbr v-if="required" title="Required">*</abbr></label>
        </slot>
      </template>

      <template slot="right">
        <slot name="options" />
      </template>

    </kirby-bar>

    <slot v-if="$slots.content" name="content" />
    <kirby-input v-else :error="error" :icon="$attrs.icon" :prefix="$attrs.prefix" @icon="icon">
      <slot />
    </kirby-input>

    <div v-if="$slots.help || help" class="kirby-field-help">
      <slot name="help">
        <p>{{ help }}</p>
      </slot>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    error: Boolean,
    help: String,
    label: String,
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
      isFocused: false
    };
  },
  created() {
    window.addEventListener("click", this.checkFocus);
  },
  destroyed() {
    window.removeEventListener("click", this.checkFocus);
  },
  methods: {
    icon() {
      this.$emit("icon");
    },
    focus() {
      this.isFocused = true;
      this.$emit("focus");
    },
    blur() {
      this.isFocused = false;
      this.$emit("blur");
    },
    checkFocus(e) {
      if (this.isFocused && this.$el.contains(e.target) === false) {
        this.blur();
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

.kirby-field-help {
  padding: 0.5rem 0;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  color: $color-dark-grey;
  line-height: 1.5;
}
</style>
