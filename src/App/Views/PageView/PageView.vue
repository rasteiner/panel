<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :editable="permissions.changeTitle" @edit="action('rename')">

      {{ page.title }}

      <template slot="buttons-left">
        <kirby-button icon="open" @click="action('preview')">
          {{ $t('page.preview') }}
        </kirby-button>
        <kirby-button v-if="status" :disabled="permissions.changeStatus === false" :icon="status.icon" @click="action('status')">
          {{ status.label }}
        </kirby-button>
        <kirby-dropdown>
          <kirby-button @click="$refs.settings.toggle()" icon="cog">
            {{ $t('settings') }}
          </kirby-button>
          <kirby-dropdown-content ref="settings" :options="options" @action="action" />
        </kirby-dropdown>
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />

      </template>

      <template v-if="page.id" slot="buttons-right">
        <kirby-button-group>
          <kirby-button :disabled="!prev" :link="prev" icon="angle-left" />
          <kirby-button :disabled="!next" :link="next" icon="angle-right" />
        </kirby-button-group>
      </template>

    </kirby-header>

    <kirby-tabs :key="'page-' + page.id + '-tabs'" v-if="page.id" :parent="$api.page.url(page.id)" :tabs="tabs" ref="tabs" />

    <kirby-page-status-dialog ref="status" @success="fetch" />
    <kirby-page-rename-dialog ref="rename" @success="fetch" />
    <kirby-page-url-dialog ref="url" />
    <kirby-page-remove-dialog ref="remove" />

  </kirby-view>

</template>

<script>
export default {
  props: ["path"],
  data() {
    return {
      page: {
        title: "",
        id: null,
        prev: null,
        next: null,
        status: null
      },
      permissions: {
        changeTitle: false,
        changeStatus: false
      },
      icon: "page",
      tabs: []
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  computed: {
    options() {
      return ready => {
        this.$api.page.options(this.page.id).then(options => {
          ready(options);
        });
      };
    },
    prev() {
      return this.page.prev ? this.$api.page.link(this.page.prev.id) : null;
    },
    next() {
      return this.page.next ? this.$api.page.link(this.page.next.id) : null;
    },
    status() {
      return this.page.status !== null
        ? this.$api.page.states()[this.page.status]
        : null;
    }
  },
  methods: {
    fetch() {
      this.$api.page
        .get(this.path, { view: "panel" })
        .then(page => {
          this.page = page;
          this.permissions = page.blueprint.options;
          this.tabs = page.blueprint.tabs;
          this.$store.commit("breadcrumb", this.$api.page.breadcrumb(page));
          this.$store.dispatch("title", this.page.title);
        })
        .catch(error => {
          this.$router.push("/pages");
        });
    },
    action(action) {
      switch (action) {
        case "preview":
          window.open(this.page.url);
          break;
        case "status":
          this.$refs.status.open(this.page.id);
          break;
        case "url":
          this.$refs.url.open(this.page.id);
          break;
        case "rename":
          this.$refs.rename.open(this.page.id);
          break;
        case "remove":
          this.$refs.remove.open(this.page.id);
          break;
        default:
          this.$store.dispatch("error", "Not yet implemented");
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-publish-bar {
  display: flex;
  align-items: center;
  border-radius: $border-radius;
  margin-top: calc(-1.5rem - 1px);
  margin-bottom: 3rem;
  padding: 0.25rem 0;
  border-top: 3px solid $color-dark;
  border-bottom: 1px solid $color-border;
}

.kirby-publish-bar-text {
  padding: 0.7rem 0;
  margin-right: 1rem;
}

.kirby-publish-bar .kirby-button {
  padding: 0.5rem;
}
</style>
