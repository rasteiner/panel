<template>
  <div class="kirby-files-collection">

    <kirby-headline>
      <span>{{ headline }}</span>
      <kirby-button-group slot="options" v-if="more && items.length !== 0">
        <kirby-button icon="upload" @click="upload"></kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="isLoading">
        <template>
          <kirby-skeleton type="list" />
        </template>
      </template>
    <template v-else>

      <kirby-collection
        :layout="layout"
        :items="items"
        :pagination="paginationOptions"
        @paginate="paginate"
        @action="action"
      />

      <kirby-box v-if="items.length === 0" class="kirby-files-collection-placeholder" :data-layout="layout">
        <kirby-button :upload="true" icon="upload" @click="upload">Upload</kirby-button>
      </kirby-box>

      <kirby-file-remove-dialog ref="remove" @success="fetch" />
      <kirby-upload ref="upload" @success="uploaded" />

    </template>

  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';

export default {
  mixins: [CollectionMixin],
  props: {
    group: {
      type: String
    },
    max: {
      type: Number,
      default: 1000
    }
  },
  mounted () {
    this.$events.$on('file', this.fetch);
    this.$refs.upload.params({
      url: window.panel.config.api + '/pages/' + this.query.parent + '/files',
    });
  },
  destroyed () {
    this.$events.$off('file', this.fetch);
  },
  computed: {
    more () {

      if (!this.max) {
        return true;
      }

      if (this.max > this.total) {
        return true;
      }

      return false;

    },
    multiple () {

      if (!this.max) {
        return true;
      }

      if (this.max === 1) {
        return false;
      }

      if ((this.max - this.total) <= 1) {
        return false;
      }

      return true;

    },
    maxToGo () {

      if (!this.max) {
        return null;
      }

      let max = this.max - this.total;

      if (max < 0) {
        max = 0;
      }

      return max;

    }
  },
  methods: {
    fetch () {

      this.query.paginate = {
        page:  this.page,
        limit: this.pagination.limit
      };

      if (this.group) {
        if (Array.isArray(this.query.filterBy) === false) {
          this.query.filterBy = [];
        }

        this.query.filterBy.push({
          field:    'group',
          operator: '==',
          value:    this.group
        })
      }

      this.$api.page.files(this.query.parent, this.query).then((response) => {

        this.total = response.pagination.total;
        this.items = response.items.map((file) => {
          var item = {
            id: file.filename,
            text: file.filename,
            preview: this.$api.file.preview(file),
            filename: file.filename,
            url: file.url + '?v=' + file.modified,
            parent: file.parent,
            mime: file.mime,
            link: '/pages/' + file.parent + '/files/' + file.filename,
            options: panel.config.api + '/pages/' + file.parent + '/files/' + file.filename + '/options'
          };

          if (file.type === 'image') {
            item.image = { url: file.url + '?v=' + file.modified };
          }
          return item;
        });

        this.isLoading = false;

      });

    },
    action (file, action) {
      switch (action) {
        case 'edit':
          this.$router.push('/pages/' + file.parent + '/files/' + file.filename);
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
    drop (files) {
      this.$refs.upload.upload(files);
    },
    upload() {
      this.$refs.upload.open({
        url: window.panel.config.api + '/pages/' + this.query.parent + '/files/',
        attributes: {group: this.group},
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
      this.$events.$emit('file');
      this.$store.dispatch('success', 'The files have been uploaded');
    }
  }
}

</script>

<style lang="scss">

.kirby-files-collection-placeholder {

  & > .kirby-button {
    text-align: center !important;
  }

}
.kirby-files-collection-placeholder[data-layout="cards"] > .kirby-button {
  padding: 33.33% 0;
}

</style>

