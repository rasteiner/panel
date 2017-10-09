<template>
  <div class="kirby-users-collection">
    <kirby-collection
      :layout="layout"
      :items="items"
      :pagination="paginationOptions"
      @paginate="paginate"
      @action="action"
    />
    <kirby-user-remove-dialog ref="remove" />
  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';
import User from 'App/Api/User.js';

export default {
  mixins: [CollectionMixin],
  methods: {
    fetch() {

      this.query.pagination = {
        page:  this.page,
        limit: this.pagination.limit
      };

      User.list(this.query).then((response) => {
        this.total = response.pagination.total;
        this.items = response.items.map((user) => ({
          id: user.id,
          image: user.image,
          text: user.data.email,
          email: user.data.email,
          role: user.role,
          link: '/users/' + user.data.email,
          options: panel.config.assets + '/options/user.json'
        }));
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
