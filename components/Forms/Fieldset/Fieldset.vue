<template>
  <kirby-grid class="kirby-fieldset" gutter="medium">
    <kirby-column v-for="(field, index) in fields" :key="index" :width="field.width || '1/1'">
      <component :is="'kirby-' + field.type + '-field'" v-bind="field" :value="values[field.name]" />
    </kirby-column>
  </kirby-grid>
</template>

<script>

/** Layout **/
import Grid from 'Layout/Grid/Grid.vue';
import Column from 'Layout/Grid/Column.vue';

/** Fields **/
import DateField from '../Fields/DateField/DateField.vue'
import TextField from '../Fields/TextField/TextField.vue'
import TextareaField from '../Fields/TextareaField/TextareaField.vue'
import TagsField from '../Fields/TagsField/TagsField.vue'
import EmailField from '../Fields/EmailField/EmailField.vue'
import NumberField from '../Fields/NumberField/NumberField.vue'
import UrlField from '../Fields/UrlField/UrlField.vue'
import TelField from '../Fields/TelField/TelField.vue'
import SelectField from '../Fields/SelectField/SelectField.vue'

export default {
  components: {
    /** Layout **/
    'kirby-grid': Grid,
    'kirby-column': Column,

    /** Form/Fields **/
    'kirby-date-field': DateField,
    'kirby-tags-field': TagsField,
    'kirby-text-field': TextField,
    'kirby-textarea-field': TextareaField,
    'kirby-email-field': EmailField,
    'kirby-number-field': NumberField,
    'kirby-url-field': UrlField,
    'kirby-tel-field': TelField,
    'kirby-select-field': SelectField,
  },
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      }
    }, 
    values: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}

</script>