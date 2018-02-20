<template>
  <kirby-field class="kirby-checkbox-field" v-bind="$props">
    <kirby-checkbox-input
      :text="text"
      :value="state"
      @input="input"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.kirby-checkbox-field .kirby-input-content {
  padding: 0.45rem 0.65rem;
}
</style>
