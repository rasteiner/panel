
<template>
  <kirby-field v-bind="$props" class="kirby-select-field">
    <kirby-select-input v-model="data" :name="name" :options="fieldoptions" />
  </kirby-field>
</template>


<script>


import SelectField from '../../../Ui/Forms/Fields/SelectField/SelectField.vue'
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  extends: SelectField,
  mixins: [Fieldoptions]
}

</script>
