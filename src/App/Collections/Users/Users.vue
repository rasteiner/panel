<template>
  <div class="kirby-users-collection">
    <kirby-collection v-bind="setup" @paginate="paginate" @action="action" />
    <kirby-user-remove-dialog ref="remove" />
  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';
import UsersQuery from 'App/Api/UsersQuery.js';

export default {
  mixins: [CollectionMixin],
  methods: {
    fetch() {

      this.query.pagination = {
        page:  this.page,
        limit: this.pagination.limit
      };

      UsersQuery(this.query).then((response) => {
        this.total = response.pagination.total;
        this.items = response.users.map(function(user) {
          return {
            id: user.email,
            image: user.image,
            text: user.email,
            email: user.email,
            role: user.role,
            link: '/users/' + user.email,
            options: '/options/user.json'
          }
        });
      });

    },
    action(user, action) {
      switch(action) {
        case 'edit':
          this.$router.push('/users/' + user.email);
          break;
        case 'remove':
          this.$refs.remove.open(user.email);
          break;
      }
    }
  }
}

</script>
