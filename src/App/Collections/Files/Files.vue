<template>
  <div class="kirby-files-collection">

    <kirby-headline>
      <span>{{ headline }}</span>
      <kirby-button-group slot="options">
        <kirby-button icon="upload" @click="$refs.upload.open()"></kirby-button>
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

    <kirby-upload ref="upload" :url="uploadApi" @success="uploaded" />

  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';
import Page from 'App/Api/Page.js';

export default {
  mixins: [CollectionMixin],
  computed: {
    uploadApi () {
      return window.panel.config.api + '/pages/' + this.query.parent + '/files';
    },
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
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    },
    uploaded () {
      this.fetch();
      this.$store.dispatch('success', 'The files have been uploaded');
    }
  }
}

</script>
