<template>
  <kirby-field class="kirby-select-field" :id="_uid" v-bind="$props" @blur="change">
    <kirby-select-input
      :id="_uid"
      :name="name"
      :disabled="disabled"
      :options="options"
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
import Options from "Ui/Forms/Field/Mixins/Options.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [Field, Label, Help, Icon, Options, Required, Value],
  props: {
    value: {
      type: [String, Number]
    }
  }
};
</script>

<style lang="scss">
.kirby-select-field .kirby-select-input select {
  width: calc(100% + 3rem);

  [dir="ltr"] & {
    right: -3rem;
  }
  [dir="rtl"] & {
    left: -3rem;
  }
}

.kirby-select-field .kirby-input-icon {
  pointer-events: none;
}
</style>
