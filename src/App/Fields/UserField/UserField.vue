<template>
  <kirby-select-field :options="options" v-bind="$props" @input="input" />
</template>

<script>

import User from 'App/Api/User.js';
import Props from 'Ui/Forms/Fields/Field.props.js';

export default {
  mixins: [Props],
  props: {
    label: {
      default: 'User'
    },
    name: {
      default: 'user'
    },
    icon: {
      default: 'user'
    },
    role: {}
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
      User.list().then(response => {
        this.options = response.items.map(user =>({
          value: user.data.email,
          text: user.data.email
        }))
      });
    }
  }
}

</script>
