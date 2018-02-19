<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination"
      @prev="prev"
      @next="next">

      <kirby-fancy-input
        type="headline"
        tag="div"
        :key="page.id + '-title'"
        :value="page.title"
        :placeholder="$t('page.title') + ' …'"
        @input="updateTitle"
        @blur="saveTitle"
        @enter="saveTitle" />

      <template slot="buttons-left">
        <kirby-button icon="preview" @click="action('preview')">
          {{ $t('page.preview') }}
        </kirby-button>
        <kirby-button :icon="status.icon" @click="action('status')">
          {{ status.text }}
        </kirby-button>
        <kirby-dropdown>
          <kirby-button @click="$refs.settings.toggle()" icon="cog">
            {{ $t('settings') }}
          </kirby-button>
          <kirby-dropdown-content ref="settings" :options="options" @action="action" />
        </kirby-dropdown>
      </template>

      <template v-if="isLoading === false" slot="buttons-right">
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
      </template>

    </kirby-header>

    <kirby-tabs :key="'page-' + page.id + '-tabs'" v-if="isLoading === false" :parent="$api.page.url(page.id)" :tabs="tabs" ref="tabs" @submit="save" />

    <kirby-page-status-dialog ref="status" @success="fetch" />
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
        next: null
      },
      icon: "page",
      isLoading: true,
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
      if (this.page.isVisible) {
        return {
          icon: "toggle-on",
          text: "Public"
        };
      } else {
        return {
          icon: "toggle-off",
          text: "Unlisted"
        };
      }
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
          this.tabs = page.blueprint.tabs;
          this.breadcrumb = this.$api.page.breadcrumb(page);

          this.$store.dispatch("title", this.page.title);
          this.$store.dispatch("isLoading", false);
          this.isLoading = false;
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
          this.$router.push("/pages");
        });
    },
    save(data) {
      // always store the latest title
      data.title = this.page.title;

      this.$api.page
        .update(this.page.id, data)
        .then(() => {
          this.$store.dispatch("success", "Saved!");
          this.$events.$emit("page.update");
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    },
    updateTitle(title) {
      this.page.title = title;
    },
    saveTitle() {
      // this.save({ title: this.page.title });
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
.kirby-page-view .kirby-column section:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>
