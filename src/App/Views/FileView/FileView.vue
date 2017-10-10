<template>

  <kirby-view class="kirby-file-view">

    <kirby-header label="File" link="/pages" icon="page" :breadcrumb="breadcrumb" :pagination="pagination" @prev="prev" @next="next">

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
            <kirby-image v-if="file.url" :src="file.url" back="black" ratio="1/1" />
          </a>
        </kirby-column>

        <kirby-column width="1/2">
          <dl>
            <template v-if="file.mime">
              <dt>Type</dt>
              <dd>{{ file.mime }}</dd>
            </template>

            <dt>URL</dt>
            <dd><a :href="file.url">{{ file.url }}</a></dd>

            <template v-if="file.niceSize">
              <dt>Size</dt>
              <dd>{{ file.niceSize }}</dd>
            </template>

            <template v-if="file.dimensions">
              <dt>Dimensions</dt>
              <dd>{{ file.dimensions }}</dd>
            </template>

            <template v-if="file.created">
              <dt>Uploaded</dt>
              <dd>{{ file.created }}</dd>
            </template>
          </dl>
        </kirby-column>
      </kirby-grid>
    </div>

    <kirby-file-remove-dialog ref="remove" />

  </kirby-view>

</template>

<script>

import File from 'App/Api/File.js';
import Page from 'App/Api/Page.js';

export default {
  props: ['path', 'filename'],
  data () {
    return {
      file: {
        filename: '',
        url: '',
        prev: null,
        next: null
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
        prev: this.file.prev ? true : false,
        prevLabel: 'Previous File',
        next: this.file.next ? true : false,
        nextLabel: 'Next File',
      };
    }
  },
  methods: {
    fetch() {

      File.get(this.path, this.filename).then((file) => {

        this.file = file;

        Page.get(this.path).then((page) => {

          this.breadcrumb = page.parents.map((parent) => {
            return {
              label: parent.title,
              link: '/pages/' + parent.id
            }
          });

          this.breadcrumb.push({
            label: page.title,
            link: '/pages/' + page.id
          });

        });

      }).catch(() => {
        this.$router.push('../');
      });

    },
    action (action) {
      switch (action) {
        case 'download':
          window.open(this.file.url);
          break;
        case 'remove':
          this.$refs.remove.open(this.file.parent, this.file.filename);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    },
    prev () {
      this.$router.push('/pages/' + this.path + '/files/' + this.file.prev);
    },
    next () {
      this.$router.push('/pages/' + this.path + '/files/' + this.file.next);
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
