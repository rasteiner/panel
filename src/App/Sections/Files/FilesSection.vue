<template>
  <section class="kirby-files-section">

    <kirby-headline>
      <span>{{ headline }}</span>
      <kirby-button-group slot="options" v-if="more && items.length !== 0">
        <kirby-button icon="upload" @click="upload"></kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="isLoading">
      <kirby-skeleton type="list" />
    </template>
    <template v-else>

      <kirby-collection
        :layout="layout"
        :items="items"
        :pagination="pagination"
        @paginate="paginate"
        @action="action" />

      <kirby-box v-if="items.length === 0" class="kirby-files-collection-placeholder" :data-layout="layout">
        <kirby-button :upload="true" icon="upload" @click="upload">Upload</kirby-button>
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
      max: this.config.max,
      query: this.config,
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },
      headline: this.config.headline,
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
  computed: {
    more() {

      if (!this.max) {
        return true;
      }

      if (this.max > this.pagination.total) {
        return true;
      }

      return false;

    },
    multiple() {

      if (!this.max) {
        return true;
      }

      if (this.max === 1) {
        return false;
      }

      if ((this.max - this.pagination.total) <= 1) {
        return false;
      }

      return true;

    },
    maxToGo() {

      if (!this.max) {
        return null;
      }

      let max = this.max - this.pagination.total;

      if (max < 0) {
        max = 0;
      }

      return max;

    }
  },
  methods: {
    fetch () {

      if (!this.query.self) {
        this.query.self = this.self;
      }

      this.$store.dispatch('isLoading', true);

      this.$api.section(this.query.type, this.query).then((response) => {
        this.items      = response.items;
        this.pagination = response.pagination;
        this.layout     = response.layout || 'list';
        this.isLoading  = false;
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
      this.$refs.upload.open({
        url: window.panel.config.api + '/pages/' + this.model.id + '/files/',
        attributes: { group: this.group },
        multiple: this.multiple,
        max: this.maxToGo
      });
    },
    replace (file) {
      this.$refs.upload.open({
        url: window.panel.config.api + '/pages/' + this.query.parent + '/files/' + file.filename,
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
      Object.assign(this.query.pagination || {}, pagination);
      this.fetch();
    }
  }
};

</script>
