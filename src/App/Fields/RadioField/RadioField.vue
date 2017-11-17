
<template>
  <ui-radio-field v-model="data" v-bind="$props" :options="fieldoptions" />
</template>

<script>

import RadioField from 'Ui/Forms/Fields/RadioField/RadioField.vue'
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  extends: RadioField,
  mixins: [Fieldoptions],
  components: {
    'ui-radio-field': RadioField
  }
}

</script>
