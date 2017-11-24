<template>

  <kirby-view class="kirby-users-view">

    <kirby-header icon="users" link="/users" :breadcrumb="breadcrumb">

      {{ $t('users') }}

      <template slot="buttons-left">
        <kirby-button icon="add" @click="$refs.create.open()">{{ $t('user.add') }}</kirby-button>
        <kirby-dropdown>
          <kirby-button icon="funnel" @click="$refs.roles.toggle()">Role: {{ role ? role : 'all' }}</kirby-button>
          <kirby-dropdown-content ref="roles" :dark="true">
            <kirby-dropdown-item @click="filter(false)" icon="bolt">all</kirby-dropdown-item>
            <kirby-dropdown-item v-for="role in roles" :key="role.value" @click="filter(role.value)" icon="bolt">{{ role.text }}</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="search" @click="$store.dispatch('error', 'Not yet implemented')">{{ $t('search') }}</kirby-button>
      </template>

    </kirby-header>

    <template v-if="users.length > 0">
      <kirby-collection :items="users" :pagination="pagination" @paginate="paginate" @action="action" />
    </template>
    <template v-else>
      <kirby-box>No results :(</kirby-box>
    </template>

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
    },
    filter (role) {
      if (role === false) {
        this.$router.push('/users');
      } else {
        this.$router.push('/users/role/' + role);
      }

      this.$refs.roles.close();
    }
  },
  computed: {
    pagination () {
      return {
        page: this.page,
        limit: this.limit
      };
    },
    breadcrumb () {

      if (this.role) {
        return [
          {
            link: '/users/role/' + this.role,
            label: 'role:' + this.role
          },
        ];
      }

      return [];

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

  .kirby-users-view-role-select {
    display: inline-block !important;
    padding: 0 !important;
  }
  .kirby-users-view-role-select > button {
    font: inherit;
    border: 0;
    background: none;
    cursor: pointer;
    color: $color-focus;

    &:focus {
      outline: none;
    }
  }

</style>
