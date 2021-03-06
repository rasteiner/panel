<template>
  <section class="kirby-pages-section" v-if="isLoading === false" :data-error="error">

    <kirby-headline :state="error ? 'negative' : null">
      <router-link v-if="link" :to="link">{{ headline }}</router-link>
      <span v-else>{{ headline }}</span>

      <kirby-button-group slot="options">
        <kirby-button v-if="create" icon="add" @click="action(null, 'create')">Add</kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="issue">
      <kirby-box>
        <strong>The section could not be loaded:</strong>
        {{ issue }}
      </kirby-box>
    </template>
    <template v-else>

      <kirby-collection
        :layout="layout"
        :items="data"
        :pagination="pagination"
        @paginate="paginate"
        @action="action" />

      <kirby-box v-if="data.length === 0" state="empty">
        <kirby-button v-if="create" @click="action(null, 'create')">No entries</kirby-button>
        <kirby-txt v-else>No entries</kirby-txt>
      </kirby-box>

      <kirby-page-create-dialog ref="create" />
      <kirby-page-url-dialog    ref="url"    @success="fetch" />
      <kirby-page-rename-dialog ref="rename" @success="fetch" />
      <kirby-page-status-dialog ref="status" @success="fetch" />
      <kirby-page-remove-dialog ref="remove" @success="fetch" />

    </template>

    <div class="kirby-pages-section-error" v-if="error">
      {{ error.message }}
    </div>

  </section>

</template>

<script>
export default {
  props: {
    parent: String,
    name: String
  },
  data() {
    return {
      create: null,
      data: [],
      issue: false,
      error: false,
      headline: null,
      isLoading: true,
      layout: "list",
      page: 1,
      link: false
    };
  },
  created() {
    this.fetch();
    this.$events.$on("page.changeStatus", this.fetch);
  },
  methods: {
    fetch() {
      this.$api
        .section(this.parent, this.name, { page: this.page })
        .then(response => {
          this.data = response.data.map(page => {
            page.options = ready => {
              this.$api.page
                .options(page.id, "list")
                .then(options => ready(options));
            };

            return page;
          });

          this.create = response.create;
          this.pagination = response.pagination;
          this.headline = response.headline;
          this.layout = response.layout || "list";
          this.link = response.link;
          this.error = response.errors[0];
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          this.issue = error.message;
        });
    },
    update(event) {},
    action(page, action) {
      switch (action) {
        case "preview":
          window.open(page.url);
          break;
        case "create":
          this.$refs.create.open(this.parent, this.name, this.create);
          break;
        case "url":
          this.$refs.url.open(page.id);
          break;
        case "status":
          this.$refs.status.open(page.id);
          break;
        case "rename":
          this.$refs.rename.open(page.id);
          break;
        case "remove":
          this.$refs.remove.open(page.id);
          break;
        default:
          this.$store.dispatch("error", "Not yet implemented");
      }
    },
    paginate(pagination) {
      this.page = pagination.page;
      this.fetch();
    }
  }
};
</script>

<style lang="scss">
.kirby-pages-section-error {
  padding: 0.5rem 0;
  font-family: $font-family-mono;
  font-size: $font-size-small;
  color: $color-negative;
}
</style>
