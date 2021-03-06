<template>

  <kirby-view class="kirby-user-view">

    <div class="kirby-user-view-wrapper">
      <kirby-header icon="users" label="User List" link="/users" :breadcrumb="breadcrumb" :pagination="pagination" :editable="permissions.changeName" @prev="prev" @next="next" @edit="action('rename')">

        {{ user.name }}

        <template slot="buttons-left">
          <template v-if="avatar">
            <kirby-dropdown>
              <kirby-button @click="$refs.picture.toggle()" icon="image">
                {{ $t('user.image') }}
              </kirby-button>
              <kirby-dropdown-content ref="picture">
                <kirby-dropdown-item icon="upload" @click="$refs.upload.open()">
                  {{ $t('change') }}
                </kirby-dropdown-item>
                <kirby-dropdown-item icon="trash" @click="action('picture.delete')">
                  {{ $t('delete') }}
                </kirby-dropdown-item>
              </kirby-dropdown-content>
            </kirby-dropdown>
          </template>
          <template v-else>
            <kirby-button @click="$refs.upload.open()" icon="image">
              {{ $t('user.image') }}
            </kirby-button>
          </template>
          <kirby-dropdown>
            <kirby-button @click="$refs.settings.toggle()" icon="cog">
              Settings
            </kirby-button>
            <kirby-dropdown-content ref="settings" :options="options" @action="action" />
          </kirby-dropdown>
          <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
        </template>

        <template v-if="user.id" class="kirby-user-view-options" slot="buttons-right">
          <kirby-form-buttons :id="'users/' + user.id" />
        </template>

      </kirby-header>

      <kirby-button class="kirby-user-view-image" v-if="avatar" @click="$refs.upload.open()">
        <kirby-image :cover="true" ratio="1/1" :src="avatar" />
      </kirby-button>

      <kirby-tabs :key="'user-' + user.id + '-tabs'" v-if="user && tabs.length" :parent="'users/' + user.id" :tabs="tabs" ref="tabs" />

      <kirby-box state="empty" v-else>
        You can define additional sections and form fields for this user role in <strong>/site/blueprints/users/{{user.role.name}}.yml</strong>
      </kirby-box>

      <kirby-user-role-dialog ref="role" @success="fetch" />
      <kirby-user-rename-dialog ref="rename" @success="fetch" />
      <kirby-user-password-dialog ref="password" />
      <kirby-user-language-dialog ref="language" />
      <kirby-user-remove-dialog ref="remove" />

      <kirby-upload ref="upload" :url="uploadApi" accept="image/jpeg" :multiple="false" @success="uploadedAvatar" />
    </div>
  </kirby-view>

</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      tabs: [],
      user: {
        role: {
          name: null
        },
        name: null,
        language: null,
        prev: null,
        next: null
      },
      permissions: {
        changeName: false
      },
      avatar: null,
      breadcrumb: null
    };
  },
  computed: {
    options() {
      return ready => {
        this.$api.user.options(this.user.id).then(options => {
          ready(options);
        });
      };
    },
    uploadApi() {
      return window.panel.config.api + "/users/" + this.user.id + "/avatar";
    },
    pagination() {
      return {
        prevLabel: this.$t("user.previous"),
        prev: this.user.prev ? true : false,
        next: this.user.next ? true : false,
        nextLabel: this.$t("user.next")
      };
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  methods: {
    action(action) {
      switch (action) {
        case "picture.delete":
          this.$api.user.deleteAvatar(this.id).then(() => {
            this.$store.dispatch(
              "success",
              this.$t("notification.image.deleted")
            );
            this.avatar = null;
          });
          break;
        case "role":
          this.$refs.role.open(this.user.id);
          break;
        case "password":
          this.$refs.password.open(this.user.id);
          break;
        case "language":
          this.$refs.language.open(this.user.id);
          break;
        case "rename":
          this.$refs.rename.open(this.user.id);
          break;
        case "remove":
          this.$refs.remove.open(this.user.id);
          break;
        default:
          this.$store.dispatch("error", "Not yet implemented");
          break;
      }
    },
    prev() {
      this.$router.push("/users/" + this.user.prev.id);
    },
    next() {
      this.$router.push("/users/" + this.user.next.id);
    },
    fetch() {
      this.$api.user.get(this.id, { view: "panel" }).then(user => {
        this.user = user;
        this.breadcrumb = this.$api.user.breadcrumb(user);
        this.tabs = user.blueprint.tabs;
        this.permissions = user.blueprint.options;

        if (user.avatar.exists) {
          this.avatar = user.avatar.url + "?v=" + user.avatar.modified;
        } else {
          this.avatar = null;
        }

        this.$store.dispatch("title", this.user.name);
      });
    },
    uploadedAvatar() {
      this.$store.dispatch("success", "The image has been uploaded!");
      this.fetch();
    }
  }
};
</script>

<style lang="scss">
.kirby-headline {
  padding-right: 5rem;
}
.kirby-user-view-wrapper {
  position: relative;
}
.kirby-user-view-image {
  position: absolute;
  top: 4.5rem;
  margin-top: -2px;
  right: 0;
  width: 3.65rem;
  display: block;
}
</style>
