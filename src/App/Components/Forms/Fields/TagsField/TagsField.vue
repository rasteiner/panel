<template>

  <ui-tags-field
    v-bind="$props"
    :options="fieldOptions"
    :value="state"
    @input="input"
  />

</template>

<script>
import Tags from "Ui/Forms/Fields/TagsField/TagsField.vue";
import FieldOptions from "../FieldOptions.mixin.js";

export default {
  extends: Tags,
  mixins: [FieldOptions],
  components: {
    "ui-tags-field": Tags
  }
};
</script>
