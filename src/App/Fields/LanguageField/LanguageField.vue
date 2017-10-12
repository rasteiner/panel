<template>
  <kirby-select-field :options="options" v-bind="$props" @input="input" />
</template>

<script>

import Language from 'App/Api/Language.js';
import Props from 'Ui/Forms/Fields/Field.props.js';

export default {
  mixins: [Props],
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
