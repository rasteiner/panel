<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <kirby-checkbox-input
    v-for="(option, index) in options"
    :key="index"
    :value="data.indexOf(option.value) !== -1"
    :text="option.text"
    @input="input($event, index)"
    />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: Array,
      default: []
    },
    name: {
      default: 'checks'
    },
    options: {
      type: Array,
      default: []
    }
  },
  methods: {
    input (value, index) {
      let option = this.fieldoptions[index].value;
      if (value === true) {
        this.data.push(option)
      } else {
        this.data = this.data.filter(item => item !== option)
      }
    }
  }
}

</script>

<style>

.kirby-checkboxes-field .kirby-input-content {
  padding: .65rem;
}

.kirby-checkboxes-field > * + * {
  margin-top: 4px;
}

</style>
