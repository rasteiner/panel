<template>

  <kirby-view class="kirby-users-view">

    <kirby-header icon="users" link="/users">

      <template v-if="role">
        {{ $t('user.role')}}: <kirby-select-input class="kirby-users-role-select" :options="roles" :value="role" @input="$router.push('/users/role/' + $event)" />
      </template>
      <template v-else>
        {{ $t('users') }}
      </template>

      <template slot="buttons-left">
        <kirby-button icon="add" @click="$refs.create.open()">{{ $t('user.add') }}</kirby-button>
        <kirby-button v-if="!role" icon="funnel" @click="$router.push('/users/role/admin')">Filter by role</kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="search" @click="$store.dispatch('error', 'Not yet implemented')">{{ $t('search') }}</kirby-button>
      </template>

    </kirby-header>

    <kirby-collection :items="users" :pagination="pagination" @paginate="paginate" @action="action" />

    <kirby-user-create-dialog ref="create" @success="fetch" />
    <kirby-user-role-dialog ref="role" @success="fetch" />
    <kirby-user-password-dialog ref="password" />
    <kirby-user-language-dialog ref="language" />
    <kirby-user-remove-dialog ref="remove" @success="fetch" />

  </kirby-view>

</template>

<script>

export default {
  data () {
    return {
      page: 1,
      limit: 20,
      total: 0,
      users: []
    };
  },
  created () {
    this.fetch();
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  methods: {
    fetch () {

      this.$store.dispatch('isLoading', true);

      let query = {
        paginate: {
          page: this.page,
          limit: this.limit
        }
      };

      if (this.role) {
        query.filterBy = [
          {
            field: 'role',
            operator: '==',
            value: this.role
          }
        ];
      }

      this.$api.user.list(query).then((response) => {
        this.total = response.pagination.total;
        this.users = response.items.map((user) => {

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
        this.$store.dispatch('isLoading', false);
      }).catch((error) => {
        this.$store.dispatch('isLoading', false);
        this.$store.dispatch('error', error.message);
      });

    },
    paginate (pagination) {
      this.page  = pagination.page;
      this.limit = pagination.limit;
    },
    action (user, action) {
      switch (action) {
        case 'edit':
          this.$router.push('/users/' + user.id);
          break;
        case 'role':
          this.$refs.role.open(user.id);
          break;
        case 'password':
          this.$refs.password.open(user.id);
          break;
        case 'language':
          this.$refs.language.open(user.id);
          break;
        case 'remove':
          this.$refs.remove.open(user.id);
          break;
      }
    }
  },
  computed: {
    pagination () {
      return {
        page: this.page,
        limit: this.limit
      };
    },
    role () {
      return this.$route.params.role;
    },
    roles () {
      // TODO: get actual roles from API
      return [
        { value: 'admin', text: 'admin' },
        { value: 'editor', text: 'editor' },
        { value: 'visitor', text: 'visitor' }
      ];
    }
  }
}

</script>

<style lang="scss">

  .kirby-users-role-select {
    display: inline-block;
  }

  .kirby-users-role-select > label {
    color: $color-dark-grey;
  }

</style>
