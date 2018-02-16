<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <template v-if="hasOptions">
      <kirby-checkbox-input
        v-for="(option, index) in options"
        :key="index"
        :value="state.indexOf(option.value) !== -1"
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

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      default: 'checks'
    },
    value: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: []
    }
  },
  computed: {
    hasOptions () {
      return this.options && this.options.length > 0
    }
  },
  methods: {
    input (value, index) {

      let option = this.options[index].value

      if (value === true) {
        this.state.push(option)
      } else {
        this.state = this.state.filter(item => item !== option)
      }

      this.$emit('input', this.state)
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
