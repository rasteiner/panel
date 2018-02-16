<template>
  <kirby-select-field
    v-bind="$props"
    :options="languages"
    :value="state"
    @input="input" />
</template>

<script>

import Language from 'Api/Language.js';
import Select from 'App/Components/Forms/Fields/SelectField/SelectField.vue'

export default {
  extends: Select,
  props: {
    name: {
      default: 'language'
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
      languages: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch () {

      Language.list().then(languages => {
        this.languages = languages.map(lang =>({
          value: lang.locale,
          text: lang.name
        }))

        this.languages.unshift({
          value: '',
          text: 'Please select a language…',
          disabled: true
         })
      });

    }
  }
}

</script>
