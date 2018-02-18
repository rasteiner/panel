<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="users" label="User List" link="/users" :breadcrumb="breadcrumb" :pagination="pagination" @prev="prev" @next="next">

      <kirby-fancy-input
        class="kirby-user-view-name"
        placeholder="Enter a name …"
        tag="div"
        type="headline"
        ref="name"
        :key="user.id + '-headline'"
        :value="name"
        @input="updateName"
        @blur="saveName"
        @enter="saveName" />

      <kirby-button class="kirby-user-view-image" v-if="avatar" @click="$refs.upload.open()">
        <kirby-image :cover="true" ratio="1/1" :src="avatar" />
      </kirby-button>

      <template slot="buttons-left">
        <kirby-dropdown>
          <kirby-button @click="$refs.picture.toggle()" icon="image">
            {{ $t('user.image') }}
          </kirby-button>
          <kirby-dropdown-content ref="picture">
            <template v-if="avatar">
              <kirby-dropdown-item icon="upload" @click="$refs.upload.open()">
                {{ $t('change') }}
              </kirby-dropdown-item>
              <kirby-dropdown-item icon="trash" @click="action('picture.delete')">
                {{ $t('delete') }}
              </kirby-dropdown-item>
            </template>
            <template v-else>
              <kirby-dropdown-item icon="upload" @click="$refs.upload.open()">
                {{ $t('upload') }}
              </kirby-dropdown-item>
              <kirby-dropdown-item icon="import" @click="action('picture.import')">
                {{ $t('import') }}
              </kirby-dropdown-item>
            </template>
          </kirby-dropdown-content>
        </kirby-dropdown>

        <kirby-dropdown>
          <kirby-button @click="$refs.settings.toggle()" icon="cog">
            Settings
          </kirby-button>
          <kirby-dropdown-content ref="settings" :options="options" @action="action" />
        </kirby-dropdown>
      </template>

      <template v-if="isLoading === false" slot="buttons-right">
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
      </template>

    </kirby-header>

    <kirby-tabs :key="'user-' + user.id + '-tabs'" v-if="user && tabs.length" :parent="'users/' + user.id" :tabs="tabs" ref="tabs" @submit="save" />

    <kirby-box v-else>
      You can define additional sections and form fields for this user role in <strong>/site/blueprints/users/{{user.role}}.yml</strong>
    </kirby-box>

    <kirby-user-role-dialog ref="role" @success="fetch" />
    <kirby-user-password-dialog ref="password" />
    <kirby-user-language-dialog ref="language" />
    <kirby-user-remove-dialog ref="remove" />

    <kirby-upload ref="upload" :url="uploadApi" accept="image/jpeg" :multiple="false" @success="uploadedAvatar" />

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
      name: null,
      isLoading: true,
      user: {
        role: null,
        name: null,
        language: null,
        prev: null,
        next: null
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
    this.$events.$on("key.save", this.save);
  },
  destroyed: function() {
    this.$events.$off("key.save", this.save);
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  methods: {
    save(data) {
      this.saveName();

      if (data === undefined) {
        return false;
      }

      this.$api.user
        .update(this.id, data)
        .then(() => {
          this.$store.dispatch("success", "Saved!");
          this.$events.$emit("user.update");
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    },
    action(action) {
      switch (action) {
        case "picture.delete":
          this.$api.user
            .deleteAvatar(this.id)
            .then(() => {
              this.$store.dispatch(
                "success",
                this.$t("notification.image.deleted")
              );
              this.avatar = null;
            })
            .catch(error => {
              this.$store.dispatch("error", error.message);
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
      this.$api.user
        .get(this.id, { view: "panel" })
        .then(user => {
          this.user = user;
          this.name = user.name;
          this.breadcrumb = this.$api.user.breadcrumb(user);
          this.tabs = user.blueprint.tabs;

          if (user.avatar.exists) {
            this.avatar = user.avatar.url + "?v=" + user.avatar.modified;
          } else {
            this.avatar = null;
          }

          this.$store.dispatch("isLoading", false);
          this.isLoading = false;
        })
        .catch(() => {
          this.$store.dispatch("error", "The user could not be found");
          this.isLoading = false;
        });
    },
    updateName(name) {
      this.name = name;
    },
    saveName() {
      return true;

      if (this.name === this.user.name) {
        return true;
      }

      this.$api.user
        .update(this.id, { name: this.name })
        .then(user => {
          this.user = user;
          this.$store.dispatch("success", "The name has been saved!");
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
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
  position: relative;
  padding-right: 5rem;
}
.kirby-user-view-image {
  position: absolute;
  top: 50%;
  width: 3rem;
  border-radius: 50%;
  margin-top: -1.5rem;
  overflow: hidden;
  z-index: 0;

  [dir="ltr"] & {
    right: 0.6rem;
    margin-right: -0.2rem;
  }
  [dir="rtl"] & {
    left: 0.6rem;
    margin-left: -0.2rem;
  }
}
</style>
