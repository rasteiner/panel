<template>
  <div class="kirby-files-collection">

    <kirby-headline>
      <span>{{ headline }}</span>
      <kirby-button-group slot="options">
        <kirby-button icon="upload" @click="upload"></kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <kirby-collection
      :layout="layout"
      :items="items"
      :pagination="paginationOptions"
      @paginate="paginate"
      @action="action"
    />

    <kirby-box v-if="items.length === 0">
      <kirby-button :upload="true" icon="upload">Upload</kirby-button>
    </kirby-box>

    <kirby-file-remove-dialog ref="remove" @success="fetch" />

    <kirby-upload ref="upload" @success="uploaded" />

  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';
import Page from 'App/Api/Page.js';

export default {
  mixins: [CollectionMixin],
  mounted () {
    this.$events.$on('file', this.fetch);
  },
  destroyed () {
    this.$events.$off('file', this.fetch);
  },
  methods: {
    fetch () {

      this.query.paginate = {
        page:  this.page,
        limit: this.pagination.limit
      };

      Page.files(this.query.parent, this.query).then((response) => {
        this.total = response.pagination.total;
        this.items = response.items.map((file) => ({
          id: file.filename,
          image: {url: file.url},
          text: file.filename,
          filename: file.filename,
          url: file.url,
          parent: file.parent,
          mime: file.mime,
          link: '/pages/' + file.parent + '/files/' + file.filename,
          options: panel.config.assets + '/options/file.json'
        }));
      });

    },
    action (file, action) {
      switch (action) {
        case 'show':
          window.open(file.url);
          break;
        case 'remove':
          this.$refs.remove.open(file.parent, file.filename);
          break;
        case 'replace':
          this.$refs.upload.open({
            url: window.panel.config.api + '/pages/' + this.query.parent + '/files/' + file.filename,
            accept: file.mime,
            multiple: false
          });
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    },
    upload() {
      this.$refs.upload.open({
        url: window.panel.config.api + '/pages/' + this.query.parent + '/files',
      });
    },
    uploaded () {
      this.fetch();
      this.$events.$emit('file');
      this.$store.dispatch('success', 'The files have been uploaded');
    }
  }
}

</script>
