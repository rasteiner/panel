
<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <kirby-checkbox-input
    v-for="(option, index) in fieldoptions"
    :key="index"
    :value="data.indexOf(option.value) !== -1"
    :text="option.text"
    @input="input($event, index)"
    />
  </kirby-field>
</template>


<script>


import CheckboxesField from '../../../Ui/Forms/Fields/CheckboxesField/CheckboxesField.vue'
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  extends: CheckboxesField,
  mixins: [Fieldoptions]
}

</script>
