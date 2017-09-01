<template>
  <kirby-select-field :options="options" v-bind="$props" />
</template>

<script>

import Query from 'App/Api/Query.js';

export default {
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

      console.log(this.role);

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
