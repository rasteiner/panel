<template>
  <div class="kirby-users-collection">
    <kirby-collection
      :layout="layout"
      :items="items"
      :pagination="paginationOptions"
      @paginate="paginate"
      @action="action"
    />
    <kirby-user-remove-dialog ref="remove" @success="fetch" />
  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';

export default {
  mixins: [CollectionMixin],
  props: ['role'],
  watch: {
    $route () {
      this.fetch();
    }
  },
  methods: {
    fetch() {

      this.query.paginate = {
        page:  this.page,
        limit: this.pagination.limit
      };

      if (this.role) {
        this.query.filterBy = [
          {
            field: 'role',
            operator: '==',
            value: this.role
          }
        ];
      } else {
        this.query.filterBy = [];
      }

      this.$api.user.list(this.query).then((response) => {
        this.total = response.pagination.total;
        this.items = response.items.map((user) => ({
          id: user.id,
          image: user.image,
          text: user.content.name ? user.content.name : user.content.email,
          role: user.role,
          link: '/users/' + user.id,
          options: panel.config.assets + '/options/user.json'
        }));
      });

    },
    action(user, action) {
      switch(action) {
        case 'edit':
          this.$router.push('/users/' + user.id);
          break;
        case 'remove':
          this.$refs.remove.open(user.id);
          break;
      }
    }
  }
}

</script>
