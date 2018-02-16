<template>
  <kirby-select-field
    :label="label"
    :name="name"
    :icon="icon"
    :help="help"
    :required="required"
    :readonly="readonly"
    :options="options"
    :value="state"
    @input="input" />
</template>

<script>

import Language from 'Api/Language.js';
import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      default: 'language'
    },
    value: {
      type: String
    },
    label: {
      default: 'Language'
    },
    icon: {
      default: 'globe'
    }
  },
  data () {
    return {
      state: this.value,
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
