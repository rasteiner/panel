<template>

  <ui-checkboxes-field
    :label="label"
    :name="name"
    :icon="icon"
    :help="help"
    :required="required"
    :readonly="readonly"
    :options="fieldOptions"
    :value="state"
    @input="input"
  />

</template>

<script>

import Checkboxes from 'Ui/Forms/Fields/CheckboxesField/CheckboxesField.vue'
import FieldOptions from '../FieldOptions.mixin.js';

export default {
  extends: Checkboxes,
  mixins: [FieldOptions],
  components: {
    'ui-checkboxes-field': Checkboxes
  }
}

</script>
