<template>
  <kirby-grid class="kirby-fieldset" gutter="large">
    <kirby-column v-for="(field, index) in fields" :key="index" :width="field.width || '1/1'">
      <component :is="'kirby-' + field.type + '-field'" v-bind="field" />
    </kirby-column>
  </kirby-grid>
</template>

<script>

/** Layout **/
import Grid from '../../Layout/Grid/Grid.vue';
import Column from '../../Layout/Grid/Column.vue';

/** Fields **/
import DateField from '../Fields/Date/Date.vue'
import TextField from '../Fields/Text/Text.vue'
import TextareaField from '../Fields/Textarea/Textarea.vue'
import TagsField from '../Fields/Tags/Tags.vue'
import EmailField from '../Fields/Email/Email.vue'
import NumberField from '../Fields/Number/Number.vue'
import UrlField from '../Fields/Url/Url.vue'
import TelField from '../Fields/Tel/Tel.vue'
import SelectField from '../Fields/Select/Select.vue'

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
  props: ['fields']
}

</script>