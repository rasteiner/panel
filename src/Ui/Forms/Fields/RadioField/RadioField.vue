<template>
  <kirby-field class="kirby-radio-field" v-bind="$props" @blur="change">
    <template v-if="hasOptions">
      <kirby-radio-input
        :options="options"
        :value="state"
        :disabled="disabled"
        @input="input" />
    </template>
    <template v-else>
      <kirby-box state="empty">
        No options available
      </kirby-box>
    </template>
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Options from "Ui/Forms/Field/Mixins/Options.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [Field, Label, Help, Options, Required, Value]
};
</script>

<style>
.kirby-radio-field .kirby-input-content {
  padding: 0.45rem 0.65rem;
}
</style>
