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
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>

export default {
  props: {
    id: {
      default: this._uid
    },
    required: {},
    autofocus: {},
    options: {
      default () {
        return [];
      }
    },
    value: {}
  },
  data () {

    var label = this.text(this.value);

    if(label == false && this.options[0]) {
      label = this.options[0].text;
    }

    return {
      data: this.value,
      label: label
    }

  },
  watch: {
    data (value) {
      this.label = this.text(value);
      this.$emit('input', value);
    }
  },
  methods: {
    focus () {
      this.$refs.select.focus();
    },
    blur () {
      this.$refs.select.blur();
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
