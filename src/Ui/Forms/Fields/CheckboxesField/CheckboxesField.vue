<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <kirby-checkbox-input
    v-for="(option, index) in fieldoptions"
    :key="index"
    :value="data.indexOf(option.value) !== -1"
    :text="option.text"
    @input="input($event, index)"
    />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  mixins: [Field, Fieldoptions],
  props: {
    value: {
      type: Array,
      default: []
    },
    name: {
      default: 'checks'
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
