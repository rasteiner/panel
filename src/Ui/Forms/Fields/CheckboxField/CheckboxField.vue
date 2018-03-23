<template>
  <kirby-field class="kirby-checkbox-field" v-bind="$props" @blur="change">
    <kirby-checkbox-input
      :text="text"
      :disabled="disabled"
      :value="state"
      @input="input"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Icon from "Ui/Forms/Field/Mixins/Icon.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Text from "Ui/Forms/Field/Mixins/Text.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [Field, Label, Help, Icon, Required, Text, Value],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.kirby-checkbox-field .kirby-input-content {
  padding: 0.45rem 0.65rem;
}
</style>
