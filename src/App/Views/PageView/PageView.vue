<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination"
      :editable="permissions.changeTitle"
      @edit="action('rename')"
      @prev="prev"
      @next="next">

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
      </template>

      <template v-if="page.id" slot="buttons-right">
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
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
      breadcrumb: [],
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
    status() {
      return this.page.status !== null
        ? this.$api.page.states()[this.page.status]
        : null;
    },
    pagination() {
      return {
        prev: this.page.prev ? true : false,
        prevLabel: "Previous page",
        next: this.page.next ? true : false,
        nextLabel: "Next page"
      };
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
          this.breadcrumb = this.$api.page.breadcrumb(page);
          this.$store.dispatch("title", this.page.title);
        })
        .catch(error => {
          this.$router.push("/pages");
        });
    },
    prev() {
      if (this.page.prev) {
        this.$router.push(this.$api.page.link(this.page.prev.id));
      }
    },
    next() {
      if (this.page.next) {
        this.$router.push(this.$api.page.link(this.page.next.id));
      }
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
