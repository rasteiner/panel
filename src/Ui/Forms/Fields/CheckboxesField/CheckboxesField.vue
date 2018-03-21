<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props" @blur="change">
    <div v-if="hasOptions" class="kirby-checkboxes-grid">
      <kirby-checkbox-input
        v-for="(option, index) in options"
        :key="index"
        :disabled="disabled"
        :value="state.indexOf(option.value) !== -1"
        :text="option.text"
        @input="input($event, index)"
      />
    </div>
    <template v-else>
      <kirby-box state="empty">
        No options available
      </kirby-box>
    </template>
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    hasOptions() {
      return this.options && this.options.length > 0;
    }
  },
  methods: {
    input(value, index) {
      let option = this.options[index].value;

      if (value === true) {
        this.state.push(option);
      } else {
        this.state = this.state.filter(item => item !== option);
      }

      this.$emit("input", this.state);
    }
  }
};
</script>

<style lang="scss">
.kirby-checkboxes-field .kirby-input-content {
  padding: 0.45rem 0.65rem;
}
.kirby-checkboxes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-column-gap: 1.5rem;
}
</style>
