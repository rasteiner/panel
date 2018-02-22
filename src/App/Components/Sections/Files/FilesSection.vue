<template>

  <section class="kirby-files-section" v-if="isLoading === false">

    <kirby-headline :state="error ? 'negative' : null">
      <span>{{ headline }}</span>
      <kirby-button-group slot="options" v-if="create">
        <kirby-button icon="upload" @click="upload"></kirby-button>
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

      <kirby-box v-if="data.length === 0" state="empty" class="kirby-files-collection-placeholder" :data-layout="layout">
        <kirby-button v-if="create" icon="upload" @click="upload">Upload</kirby-button>
        <kirby-txt v-else>No files</kirby-txt>
      </kirby-box>

      <kirby-file-remove-dialog ref="remove" @success="fetch" />
      <kirby-upload ref="upload" @success="uploaded" />

    </template>

    <div class="kirby-files-section-error" v-if="error">
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
      error: false,
      headline: null,
      isLoading: true,
      issue: false,
      layout: "list",
      page: 1,
      pagination: {}
    };
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.$events.$on("file.create", this.fetch);
    this.$events.$on("file.delete", this.fetch);
  },
  destroyed() {
    this.$events.$off("file.create", this.fetch);
    this.$events.$off("file.delete", this.fetch);
  },
  methods: {
    fetch() {
      this.$api
        .section(this.parent, this.name, { page: this.page })
        .then(response => {
          this.data = response.data.map(file => {
            file.options = ready => {
              this.$api.file
                .options(file.parent, file.filename)
                .then(options => ready(options));
            };

            return file;
          });

          this.error = response.errors[0];
          this.headline = response.headline;
          this.create = response.create;
          this.pagination = response.pagination;
          this.layout = response.layout || "list";
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          this.issue = error.message;
        });
    },
    action(file, action) {
      switch (action) {
        case "edit":
          this.$router.push(file.link);
          break;
        case "download":
          window.open(file.url);
          break;
        case "replace":
          this.replace(file);
          break;
        case "remove":
          this.$refs.remove.open(file.parent, file.filename);
          break;
        default:
          this.$store.dispatch("error", "Not yet implemented");
      }
    },
    upload() {
      this.$refs.upload.open({
        url: window.panel.config.api + "/" + this.parent + "/" + this.name,
        accept: this.create.mime
      });
    },
    replace(file) {
      this.$store.dispatch("error", "Not yet implemented");
    },
    uploaded() {
      this.fetch();
      this.$events.$emit("file.create");
      this.$store.dispatch("success", "The files have been uploaded");
    },
    paginate(pagination) {
      this.page = pagination.page;
      this.fetch();
    }
  }
};
</script>

<style lang="scss">
.kirby-files-section-error {
  padding: 0.5rem 0;
  font-family: $font-family-mono;
  font-size: $font-size-small;
  color: $color-negative;
}
</style>
