<template>
  <div class="kirby-files-collection">
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

    <kirby-file-remove-dialog ref="remove" />
  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';
import FilesQuery from 'App/Api/FilesQuery.js';

export default {
  mixins: [CollectionMixin],
  methods: {
    fetch () {

      this.query.pagination = {
        page:  this.page,
        limit: this.pagination.limit
      };

      FilesQuery(this.query).then((response) => {
        this.total = response.pagination.total;
        this.items = response.files.map((file) => ({
          id: file.filename,
          image: {url: file.url},
          text: file.filename,
          filename: file.filename,
          url: file.url,
          link: '/files/' + file.page.id + '/' + file.filename,
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
          this.$refs.remove.open(file.filename);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    }
  }
}

</script>
