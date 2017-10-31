
<template>
  <ui-checkboxes-field v-model="data" v-bind="$props" :options="fieldoptions" />
</template>

<script>

import CheckboxesField from 'Ui/Forms/Fields/CheckboxesField/CheckboxesField.vue'
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  extends: CheckboxesField,
  mixins: [Fieldoptions],
  components: {
    'ui-checkboxes-field': CheckboxesField
  }
}

</script>
