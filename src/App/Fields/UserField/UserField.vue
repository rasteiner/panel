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

      Query(`
        query($role: String) {
          users(role: $role) {
            items {
              email,
              firstName,
              role
            }
          }
        }
      `, {role: this.role}).
      then(response => {
        this.options = response.users.items.map(user =>({
          value: user.email,
          text: `${user.email}`
        }))
      });

    }
  }
}

</script>
