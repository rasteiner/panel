<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <template v-if="hasOptions">
      <kirby-checkbox-input
      v-for="(option, index) in options"
      :key="index"
      :value="data.indexOf(option.value) !== -1"
      :text="option.text"
      @input="input($event, index)"
      />
    </template>
    <template v-else>
      <kirby-box state="empty">
        No options available
      </kirby-box>
    </template>
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
  computed: {
    hasOptions () {
      return this.options && this.options.length > 0;
    }
  },
  methods: {
    input (value, index) {
      let option = this.options[index].value;
      if (value === true) {
        this.data.push(option)
      } else {
        this.data = this.data.filter(item => item !== option)
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-checkboxes-field .kirby-input-content {
  padding: .65rem;
}

.kirby-checkboxes-field > * + * {
  margin-top: 4px;
}

</style>
