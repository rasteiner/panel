<template>

  <ui-select-field
    v-bind="$props"
    :options="fieldOptions"
    :value="state"
    @input="input"
  />

</template>

<script>
import Select from "Ui/Forms/Fields/SelectField/SelectField.vue";
import FieldOptions from "../FieldOptions.mixin.js";

export default {
  extends: Select,
  mixins: [FieldOptions],
  components: {
    "ui-select-field": Select
  }
};
</script>
