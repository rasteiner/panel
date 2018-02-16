<template>

  <ui-radio-field
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

import Radio from 'Ui/Forms/Fields/RadioField/RadioField.vue'
import FieldOptions from '../FieldOptions.mixin.js';

export default {
  extends: Radio,
  mixins: [FieldOptions],
  components: {
    'ui-radio-field': Radio
  }
}

</script>
