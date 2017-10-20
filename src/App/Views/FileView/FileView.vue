<template>

  <kirby-view class="kirby-file-view">

    <kirby-header label="File" link="/pages" icon="page" :breadcrumb="breadcrumb" :pagination="pagination" @prev="prev" @next="next">

      <div class="kirby-file-view-title">
        <kirby-fancy-input
          ref="filename"
          :key="file.id + '-title'"
          v-model="file.name"
          placeholder="filename"
          tag="span"
          @blur="updateFilename($event.target.innerText)"
          @enter="$event.target.blur()" /><span>.{{ file.extension }}</span>
      </div>

      <template slot="buttons-left">
        <kirby-button icon="download" @click="action('download')">
          Download
        </kirby-button>
        <kirby-button icon="upload" @click="$refs.upload.open()">
          Replace
        </kirby-button>
        <kirby-button icon="trash" @click="action('remove')">
          {{ $t('delete') }}
        </kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-translations />
      </template>

    </kirby-header>

    <kirby-dropzone label="Drop file to replace" @drop="$refs.upload.upload($event)" class="kirby-file-details">
      <kirby-grid gutter="large">

        <kirby-column width="1/4">
          <kirby-headline><span>Preview</span></kirby-headline>

          <a :href="file.url" target="_blank">
            <kirby-image v-if="file.url" :src="file.url + '?' + new Date()" back="black" ratio="1/1" />
          </a>
        </kirby-column>
        <kirby-column width="3/4">

          <kirby-headline><span>Details</span></kirby-headline>

          <kirby-grid gutter="large" class="kirby-file-view-details">

            <kirby-column width="1/2">
              <dl>
                <template v-if="file.mime">
                  <dt>Type</dt>
                  <dd>{{ file.mime }}</dd>
                </template>

                <dt>URL</dt>
                <dd><a :href="file.url" target="__blank">/{{ file.id }}</a></dd>

                <template v-if="file.niceSize">
                  <dt>Size</dt>
                  <dd>{{ file.niceSize }}</dd>
                </template>

              </dl>
            </kirby-column>

            <kirby-column width="1/2">
              <dl>
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

        </kirby-column>

        <kirby-column width="1/1">
          <form @submit.prevent="save" method="post">
            <kirby-fieldset :fields="fields" :values="file.meta" @submit="save" />
          </form>
        </kirby-column>

      </kirby-grid>
    </kirby-dropzone>

    <kirby-file-remove-dialog ref="remove" />

    <kirby-upload ref="upload" :url="uploadApi" :accept="file.mime" :multiple="false" @success="uploaded" />

  </kirby-view>

</template>

<script>

import File from 'App/Api/File.js';
import Page from 'App/Api/Page.js';
import slug from 'App/Helpers/slug.js';

export default {
  props: ['path', 'filename'],
  data () {
    return {
      name: '',
      file: {
        filename: '',
        url: '',
        prev: null,
        next: null,
        mime: null,
        meta: {}
      },
      fields: [
        {
          name: 'alt',
          label: 'Alternative Text',
          type: 'text'
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'textarea'
        }
      ],
      breadcrumb: []
    }
  },
  created () {
    this.fetch();
    this.$events.$on('key.save', this.save);
  },
  destroyed: function () {
    this.$events.$off('key.save', this.save);
  },
  watch: {
    $route () {
      this.fetch();
    }
  },
  computed: {
    uploadApi () {
      return window.panel.config.api + '/pages/' + this.path + '/files/' + this.filename;
    },
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
        this.name = file.name;
        File.breadcrumb(file).then((breadcrumb) => {
          this.breadcrumb = breadcrumb;
        });

      }).catch(() => {
        this.$store.dispatch('error', 'The file could not be found');
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
    },
    updateFilename (name) {

      name = slug(name);

      if (name.length === 0) {
        this.$store.dispatch('alert', 'Please enter a filename');
        return;
      }

      if (name === this.name) {
        return true;
      }

      File.rename(this.path, this.file.filename, name).then((file) => {
        this.$router.push('/pages/' + this.path + '/files/' + file.filename);
        this.$store.dispatch('success', 'The file has been renamed');
      });

    },
    uploaded () {
      this.$store.dispatch('success', 'The file has been replaced');
    },
    save () {

      File.update(this.path, this.file.filename, this.file.meta).then((file) => {
        this.file.meta = file.meta;
        this.$store.dispatch('success', 'Saved!');
      });

    }
  }
}

</script>

<style lang="scss">


.kirby-file-view-title {
  display: flex;
}
.kirby-file-view-title > span:first-child {
  width: auto;
  text-transform: lowercase;
}
.kirby-file-view-title > span:first-child:focus {
  @include focus-ring;
  background: #fff;
  padding: 0 .5rem;
  margin-left: -.5rem;
  margin-right: -.5rem;
}


.kirby-file-view .kirby-image {
  border-radius: $border-radius;
  overflow: hidden;
}

.kirby-file-view-section {
  margin-bottom: 3rem;
}

.kirby-file-view dl {
  line-height: 1.5em;
  margin-top: -.4rem;
}
.kirby-file-view dt {
  font-family: $font-family-mono;
  font-size: $font-size-small;
  color: $color-dark-grey;
}
.kirby-file-view dd {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: $font-size-small;
}
.kirby-file-view dd:not(:last-child) {
  margin-bottom: .75rem;
}
.kirby-file-view dd a {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}



</style>
