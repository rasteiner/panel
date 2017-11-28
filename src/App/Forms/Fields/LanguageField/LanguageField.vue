<template>
  <kirby-select-field
    :label="label"
    :name="name"
    :icon="icon"
    :help="help"
    :required="required"
    :readonly="readonly"
    :options="options"
    v-model="data" />
</template>

<script>

import Language from 'Api/Language.js';
import Field from 'Ui/Forms/Fields/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    label: {
      default: 'Language'
    },
    name: {
      default: 'language'
    },
    icon: {
      default: 'globe'
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      data: this.value,
      options: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch () {

      Language.list().then(languages => {
        this.options = languages.map(lang =>({
          value: lang.locale,
          text: lang.name
        }))

        this.options.unshift({
          value: '',
          text: 'Please select a language…',
          disabled: true
         })
      });

    }
  }
}

</script>
