<template>

  <kirby-view class="kirby-users-view">

    <kirby-header icon="users" link="/users" :breadcrumb="breadcrumb">

      {{ $t('users') }}

      <template slot="buttons-left">
        <kirby-button icon="add" :disabled="permissions.create === false" @click="$refs.create.open()">{{ $t('user.add') }}</kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-dropdown>
          <kirby-button icon="funnel" @click="$refs.roles.toggle()">Role: {{ role ? role.text : 'All' }}</kirby-button>
          <kirby-dropdown-content ref="roles">
            <kirby-dropdown-item @click="filter(false)" icon="bolt">All</kirby-dropdown-item>
            <kirby-dropdown-item v-for="role in roles" :key="role.value" @click="filter(role)" icon="bolt">{{ role.text }}</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
      </template>

    </kirby-header>

    <template v-if="users.length > 0">
      <kirby-collection :items="users" :pagination="pagination" @paginate="paginate" @action="action" />
    </template>
    <template v-else>
      <kirby-box state="empty">No users</kirby-box>
    </template>

    <kirby-user-create-dialog ref="create" @success="fetch" />
    <kirby-user-role-dialog ref="role" @success="fetch" />
    <kirby-user-rename-dialog ref="rename" @success="fetch" />
    <kirby-user-password-dialog ref="password" />
    <kirby-user-language-dialog ref="language" />
    <kirby-user-remove-dialog ref="remove" @success="fetch" />

  </kirby-view>

</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 20,
      total: 0,
      users: [],
      roles: [],
      permissions: this.$store.state.user.permissions.user
    };
  },
  created() {
    this.$api.role.options().then(roles => {
      this.roles = roles;
      this.fetch();
    });
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch("title", "Users");

      let query = {
        paginate: {
          page: this.page,
          limit: this.limit
        }
      };

      if (this.role) {
        query.filterBy = [
          {
            field: "role",
            operator: "==",
            value: this.role.value
          }
        ];
      }

      this.$api.user.list(query).then(response => {
        this.total = response.pagination.total;
        this.users = response.data.map(user => {
          let item = {
            id: user.id,
            preview: { icon: "user" },
            text: user.name,
            info: user.role.title,
            link: "/users/" + user.id,
            options: ready => {
              this.$api.user
                .options(user.id, "list")
                .then(options => ready(options));
            },
            image: null
          };

          if (user.avatar.exists === true) {
            item.image = {
              url: user.avatar.url + "?v=" + user.avatar.modified
            };
          }

          return item;
        });
      });
    },
    paginate(pagination) {
      this.page = pagination.page;
      this.limit = pagination.limit;
    },
    action(user, action) {
      switch (action) {
        case "edit":
          this.$router.push("/users/" + user.id);
          break;
        case "role":
          this.$refs.role.open(user.id);
          break;
        case "rename":
          this.$refs.rename.open(user.id);
          break;
        case "password":
          this.$refs.password.open(user.id);
          break;
        case "language":
          this.$refs.language.open(user.id);
          break;
        case "remove":
          this.$refs.remove.open(user.id);
          break;
      }
    },
    filter(role) {
      if (role === false) {
        this.$router.push("/users");
      } else {
        this.$router.push("/users/role/" + role.value);
      }

      this.$refs.roles.close();
    }
  },
  computed: {
    pagination() {
      return {
        page: this.page,
        limit: this.limit
      };
    },
    breadcrumb() {
      if (this.role) {
        return [
          {
            link: "/users/role/" + this.role.value,
            label: "role:" + this.role.value
          }
        ];
      }

      return [];
    },
    role() {
      let currentRole = null;

      if (this.$route.params.role) {
        this.roles.forEach(role => {
          if (role.value === this.$route.params.role) {
            currentRole = role;
          }
        });
      }

      return currentRole;
    }
  }
};
</script>
