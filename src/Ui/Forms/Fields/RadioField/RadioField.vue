<template>
  <kirby-field class="kirby-radio-field" v-bind="$props">
    <kirby-radio-input
      :options="options"
      :value="state"
      @input="input" />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style>
.kirby-radio-field .kirby-input-content {
  padding: 0.45rem 0.65rem;
}
</style>
