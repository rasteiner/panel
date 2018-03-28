<template>
  <section class="kirby-pages-section" v-if="isLoading === false" :data-error="error">

    <kirby-headline :state="error ? 'negative' : null">
      <router-link v-if="link" :to="link">{{ headline }}</router-link>
      <span v-else>{{ headline }}</span>

      <kirby-button-group slot="options">
        <kirby-button v-if="add" icon="add" @click="action(null, 'create')">Add</kirby-button>
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
        :sortable="true"
        :group="group"
        @change="sort"
        @paginate="paginate"
        @action="action">
        <kirby-box state="empty">
          <kirby-button v-if="add" @click="action(null, 'create')">No entries</kirby-button>
          <kirby-txt v-else>No entries</kirby-txt>
        </kirby-box>
      </kirby-collection>

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
      add: false,
      blueprints: [],
      data: [],
      issue: false,
      error: false,
      group: null,
      headline: null,
      isLoading: true,
      layout: "list",
      status: null,
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

          this.add = response.add;
          this.blueprints = response.blueprints;
          this.pagination = response.pagination;
          this.status = response.status;
          this.group = response.group;
          this.headline = response.headline;
          this.sortable = response.sortable;
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
    sort(event) {
      let type = null;

      if (event.added) {
        type = "added";
      }

      if (event.moved) {
        type = "moved";
      }

      if (type) {
        const element = event[type].element;
        const position = event[type].newIndex + 1;

        this.$api
          .patch(this.parent + "/" + this.name + "/sort", {
            page: element.id,
            status: this.status,
            position: position
          })
          .then(response => {
            this.$store.dispatch("success", "Sorted!");
          })
          .catch(response => {
            this.$store.dispatch("error", response.message);
            this.$events.$emit("page.changeStatus");
          });
      }
    },
    action(page, action) {
      switch (action) {
        case "preview":
          window.open(page.url);
          break;
        case "create":
          this.$refs.create.open(
            this.parent,
            this.name,
            this.blueprints.map(blueprint => {
              return {
                value: blueprint.name,
                text: blueprint.title
              };
            })
          );
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
