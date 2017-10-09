<template>

  <kirby-view class="kirby-file-view">

    <kirby-header label="File" link="/pages" icon="page" :breadcrumb="breadcrumb" :pagination="pagination">

      {{ file.filename }}

      <template slot="buttons-left">
        <kirby-button icon="download" @click="action('download')">
          {{ $t('download') }}
        </kirby-button>
        <kirby-button icon="upload" :upload="true">
          {{ $t('upload') }}
        </kirby-button>
        <kirby-button icon="title" @click="action('rename')">
          {{ $t('rename') }}
        </kirby-button>
        <kirby-button icon="trash" @click="action('remove')">
          {{ $t('delete') }}
        </kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-translations></kirby-translations>
      </template>

    </kirby-header>

    <div class="kirby-file-details">
      <kirby-grid>

        <kirby-column width="1/2">
          <a :href="file.url" target="_blank">
            <kirby-image :src="file.url" back="black" ratio="1/1" />
          </a>
        </kirby-column>

        <kirby-column width="1/2">
          <dl>
            <dt>Type</dt>
            <dd>image/jpeg</dd>

            <dt>URL</dt>
            <dd><a :href="file.url">{{ file.url }}</a></dd>

            <dt>Size</dt>
            <dd>{{ file.niceSize }}</dd>

            <dt>Dimensions</dt>
            <dd>1023 &times; 931</dd>

            <dt>Uploaded</dt>
            <dd>3 days ago by bastian</dd>
          </dl>
        </kirby-column>
      </kirby-grid>
    </div>

    <kirby-file-remove-dialog ref="remove" />

  </kirby-view>

</template>

<script>

import File from 'App/Api/File.js';

export default {
  props: ['path'],
  data () {
    return {
      file: {
        filename: ''
      },
      breadcrumb: []
    }
  },
  created () {
    this.fetch();
  },
  watch: {
    $route () {
      this.fetch();
    }
  },
  computed: {
    pagination() {
      return {
        page: 1,
        limit: 1,
        total: 5,
        pageLabel: 'File',
        prevLabel: 'Previous File',
        nextLabel: 'Next File'
      };
    }
  },
  methods: {
    fetch() {

      File.get(this.path).then((file) => {
        this.file       = file;
        this.breadcrumb = file.breadcrumb;
      });

    },
    action (action) {
      switch (action) {
        case 'download':
          window.open(this.file.url);
          break;
        case 'remove':
          this.$refs.remove.open(this.file.filename);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-file-view .kirby-header {
  margin-bottom: 0;
  border-bottom: 0;
}

.kirby-file-details {
  background: $color-white;
  border-radius: $border-radius;
}

.kirby-file-view .kirby-image {
  border-radius: $border-radius;
  overflow: hidden;
}

.kirby-file-view dl {
  line-height: 1.5em;
  padding: 1.5rem 1.5rem .75rem;
}
.kirby-file-view dt {
  font-family: $font-family-mono;
  font-size: $font-size-small;
  color: $color-dark-grey;
}
.kirby-file-view dd {
  margin-bottom: .75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: $font-size-small;
}
.kirby-file-view dd a {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
