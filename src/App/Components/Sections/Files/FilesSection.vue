<template>
  <section class="kirby-files-section">

    <kirby-headline>
      <span>{{ headline }}</span>
      <kirby-button-group slot="options" v-if="add && items.length !== 0">
        <kirby-button icon="upload" @click="upload"></kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="isLoading">
      <kirby-skeleton type="list" />
    </template>
    <template v-else-if="error">
      <kirby-box>
        <strong>The section could not be loaded:</strong>
        {{ error }}
      </kirby-box>
    </template>
    <template v-else>

      <kirby-collection
        :layout="layout"
        :items="items"
        :pagination="pagination"
        @paginate="paginate"
        @action="action" />

      <kirby-box v-if="items.length === 0" class="kirby-files-collection-placeholder" :data-layout="layout">
        <kirby-button v-if="add" icon="upload" @click="upload">Upload</kirby-button>
        <kirby-txt v-else>No files :(</kirby-txt>
      </kirby-box>

      <kirby-file-remove-dialog ref="remove" @success="fetch" />
      <kirby-upload ref="upload" @success="uploaded" />

    </template>

  </section>
</template>

<script>

export default {
  props: {
    self: String,
    config: Object
  },
  data() {
    return {
      layout: 'list',
      items: [],
      error: null,
      add: null,
      max: this.config.max,
      query: this.config,
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },
      headline: null,
      isLoading: true
    }
  },
  created () {
    this.fetch();
  },
  mounted () {
    this.$events.$on('file.create', this.fetch);
    this.$events.$on('file.delete', this.fetch);
  },
  destroyed () {
    this.$events.$off('file.create', this.fetch);
    this.$events.$off('file.delete', this.fetch);
  },
  methods: {
    fetch () {

      if (!this.query.self) {
        this.query.self = this.self;
      }

      this.$store.dispatch('isLoading', true);

      this.$api.section(this.query.type, this.query).then((response) => {
        this.headline   = response.headline;
        this.add        = response.add;
        this.items      = response.items;
        this.pagination = response.pagination;
        this.layout     = response.layout || 'list';
        this.isLoading  = false;
        this.$store.dispatch('isLoading', false);
      }).catch((error) => {
        this.isLoading = false;
        this.error     = error.message;
        this.$store.dispatch('isLoading', false);
      });

    },
    action (file, action) {
      switch (action) {
        case 'edit':
          this.$router.push(file.link);
          break;
        case 'download':
          window.open(file.url);
          break;
        case 'replace':
          this.replace(file);
          break;
        case 'remove':
          this.$refs.remove.open(file.parent, file.filename);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    },
    upload () {
      this.$refs.upload.open(this.add);
    },
    replace (file) {
      this.$refs.upload.open({
        url: window.panel.config.api + '/pages/' + file.parent + '/files/' + file.filename,
        accept: file.mime,
        multiple: false
      });
    },
    uploaded () {
      this.fetch();
      this.$events.$emit('file.create');
      this.$store.dispatch('success', 'The files have been uploaded');
    },
    paginate (pagination) {
      this.query.pagination = Object.assign(this.query.pagination || {}, pagination);
      this.fetch();
    }
  }
};

</script>
