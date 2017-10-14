<template>
  <kirby-select-field :options="options" v-bind="$props" v-model="data" />
</template>

<script>

import User from 'App/Api/User.js';
import Field from 'Ui/Forms/Fields/Field.mixin.js';

export default {
  mixins: [Field],
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
    role: {
      type: String
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
