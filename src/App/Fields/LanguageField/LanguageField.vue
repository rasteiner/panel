<template>
  <kirby-select-field :options="options" v-bind="$props" @input="input" />
</template>

<script>

import Query from 'App/Api/Query.js';
import Props from '../../../Ui/Forms/Fields/Field.props.js';

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
    }
  },
  data() {
    return {
      options: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {

      Query(`
        query {
          languages {
            name,
            locale
          }
        }
      `).
      then(response => {
        this.options = response.languages.map(lang =>({
          value: lang.locale,
          text: lang.name
        }))
      });

    }
  }
}

</script>
