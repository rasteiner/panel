
<template>
  <kirby-field class="kirby-radio-field" v-bind="$props">
    <kirby-radio-input v-model="data" :name="name" :options="fieldoptions" />
  </kirby-field>
</template>


<script>

import RadioField from 'Ui/Forms/Fields/RadioField/RadioField.vue'
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  extends: RadioField,
  mixins: [Fieldoptions]
}

</script>
