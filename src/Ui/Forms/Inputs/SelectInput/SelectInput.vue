<template>
  <div v-if="options.length" class="kirby-select-input">
    <select
    ref="select"
    v-bind="$props"
    v-model="data"
    @focus="$emit('focus')"
    @blur="$emit('blur')">

      <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled">{{ option.text }}</option>

    </select>
    <label :for="_uid">{{ label }}</label>
  </div>
</template>

<script>

import Input from '../Input.mixin.js';

export default {
  mixins: [Input],
  props: {
    options: {
      type: Array,
      default: []
    },
  },
  computed: {
    label () {
      var label = this.text(this.data);

      if(!label && this.options[0]) {
        label = this.options[0].text;
      }

      return label;
    }
  },
  methods: {
    focus () {
      this.$refs.select.focus()
    },
    blur () {
      this.$refs.select.blur()
    },
    text (value) {
      var text = '';
      this.options.forEach((option) => {
        if(option.value == value) {
          text = option.text;
        }
      });
      return text;
    }
  }
}

</script>

<style lang="scss">

.kirby-select-input {
  position: relative;
  cursor: pointer;
}
.kirby-select-input select {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  font: inherit;
  cursor: pointer;
  -webkit-appearance: none;
}
.kirby-select-input label {
  cursor: pointer;
}
.kirby-select-input select:focus + label {
  color: $color-focus;
}

</style>
