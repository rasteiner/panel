<template>
  <div class="kirby-users-collection">
    <kirby-collection
      :layout="layout"
      :items="items"
      :pagination="paginationOptions"
      @paginate="paginate"
      @action="action"
    />
    <kirby-user-role-dialog ref="role" @success="fetch" />
    <kirby-user-password-dialog ref="password" />
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
        this.items = response.items.map((user) => {
          let item = {
            id: user.id,
            preview: { icon: 'user' },
            text: user.content.name ? user.content.name : user.content.email,
            role: user.role,
            link: '/users/' + user.id,
            options: window.panel.config.api + '/users/' + user.id + '/options',
            image: null
          };

          if (user.image.exists === true) {
            item.image = {
              url: user.image.url + '?v=' + user.image.modified
            };
          }

          return item;

        });
      }).catch((error) => {
        this.isLoading = false;
        this.$store.dispatch('error', error.message);
      });

    },
    action(user, action) {
      switch(action) {
        case 'edit':
          this.$router.push('/users/' + user.id);
          break;
        case 'role':
          this.$refs.role.open(user.id);
          break;
        case 'password':
          this.$refs.password.open(user.id);
          break;
        case 'remove':
          this.$refs.remove.open(user.id);
          break;
      }
    }
  }
}

</script>
