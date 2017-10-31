
<template>
  <ui-select-field v-model="data" v-bind="$props" :options="fieldoptions" />
</template>

<script>

import SelectField from 'Ui/Forms/Fields/SelectField/SelectField.vue'
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  extends: SelectField,
  mixins: [Fieldoptions],
  components: {
    'ui-select-field': SelectField
  }
}

</script>
