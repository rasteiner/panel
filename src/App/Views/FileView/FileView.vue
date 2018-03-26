<template>

  <kirby-view class="kirby-file-view">

    <kirby-header :editable="permissions.changeName" @edit="action('rename')">

      {{ file.filename }}

      <template slot="buttons-left">
        <kirby-button icon="open" @click="action('download')">
          Open
        </kirby-button>
        <kirby-button :disabled="permissions.delete === false" icon="trash" @click="action('remove')">
          {{ $t('delete') }}
        </kirby-button>
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
      </template>

      <template v-if="file.id" slot="buttons-right">
        <kirby-button-group>
          <kirby-button :disabled="!prev" :link="prev" icon="angle-left" />
          <kirby-button :disabled="!next" :link="next" icon="angle-right" />
        </kirby-button-group>
      </template>

    </kirby-header>

    <kirby-box class="kirby-file-viewer">
      <kirby-grid gutter="medium">

        <kirby-column width="1/4">
          <a :href="file.url" target="_blank">
            <kirby-image v-if="preview.image" :src="preview.image" back="pattern" ratio="1/1" />
            <kirby-icon class="kirby-file-view-preview" v-else :style="{ backgroundColor: preview.color }" :type="preview.icon || 'document'" />
          </a>
        </kirby-column>
        <kirby-column width="3/4">
          <kirby-grid gutter="medium" class="kirby-file-view-details">

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
                  <dd>{{ file.dimensions.width }}&times;{{ file.dimensions.height }} Pixels</dd>
                </template>

                <template v-if="file.dimensions">
                  <dt>Orientation</dt>
                  <dd>{{ file.dimensions.orientation }}</dd>
                </template>

              </dl>
            </kirby-column>

          </kirby-grid>

        </kirby-column>

      </kirby-grid>
    </kirby-box>

    <kirby-tabs :key="'file-' + file.id + '-tabs'" v-if="file.id" :parent="$api.file.url(file.parent.id, file.filename)" :tabs="tabs" ref="tabs" />

    <kirby-file-rename-dialog ref="rename" />
    <kirby-file-remove-dialog ref="remove" @success="$router.push('/pages/' + path)" />
    <kirby-upload ref="upload" :url="uploadApi" :accept="file.mime" :multiple="false" @success="uploaded" />

  </kirby-view>

</template>

<script>
import slug from "App/Helpers/slug.js";

export default {
  props: ["path", "filename"],
  data() {
    return {
      name: "",
      preview: {},
      file: {
        id: null,
        parent: null,
        filename: "",
        url: "",
        prev: null,
        next: null,
        mime: null,
        content: {}
      },
      permissions: {
        changeName: false,
        delete: false
      },
      tabs: [],
      breadcrumb: []
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  computed: {
    uploadApi() {
      return (
        window.panel.config.api +
        "/pages/" +
        this.path +
        "/files/" +
        this.filename
      );
    },
    pagination() {
      return {
        prev: this.file.prev ? true : false,
        prevLabel: "Previous File",
        next: this.file.next ? true : false,
        nextLabel: "Next File"
      };
    },
    prev() {
      return this.file.prev
        ? this.$api.file.link(this.file.parent.id, this.file.prev.filename)
        : null;
    },
    next() {
      return this.file.next
        ? this.$api.file.link(this.file.parent.id, this.file.next.filename)
        : null;
    }
  },
  methods: {
    fetch() {
      this.$api.file
        .get(this.path, this.filename, { view: "panel" })
        .then(file => {
          this.file = file;
          this.file.url = file.url + "?v=" + file.modified;
          this.name = file.name;
          this.tabs = file.blueprint.tabs;
          this.permissions = file.blueprint.options;
          this.preview = this.$api.file.preview(file);

          this.$api.file.breadcrumb(file).then(breadcrumb => {
            this.$store.commit("breadcrumb", breadcrumb);
          });

          this.$store.dispatch("title", this.filename);
        })
        .catch(() => {
          this.$router.push("../");
        });
    },
    action(action) {
      switch (action) {
        case "download":
          window.open(this.file.url);
          break;
        case "rename":
          this.$refs.rename.open(this.file.parent.id, this.file.filename);
          break;
        case "remove":
          this.$refs.remove.open(this.file.parent.id, this.file.filename);
          break;
        default:
          this.$store.dispatch("error", "Not yet implemented");
          break;
      }
    },
    updateFilename(name) {
      name = slug(name);

      if (name.length === 0) {
        this.$store.dispatch("alert", "Please enter a filename");
        return;
      }

      if (name === this.name) {
        return true;
      }

      this.$api.file.rename(this.path, this.file.filename, name).then(file => {
        this.$router.push("/pages/" + this.path + "/files/" + file.filename);
        this.$store.dispatch("success", "The file has been renamed");
      });
    },
    uploaded() {
      this.fetch();
      this.$store.dispatch("success", "The file has been replaced");
    }
  }
};
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
  padding: 0 0.5rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.kirby-file-view .kirby-image {
  border-radius: $border-radius;
  overflow: hidden;
}
.kirby-file-view-preview {
  position: relative;
  display: block;
  padding-bottom: 100%;
  background: $color-black;
  border-radius: $border-radius;
  overflow: hidden;
}
.kirby-file-view-preview svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(4);
}
.kirby-file-view-preview svg * {
  fill: rgba($color-white, 0.5);
}

.kirby-file-view dl {
  line-height: 1.5em;
  margin-top: -0.4rem;
}
.kirby-file-view dt {
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
  margin-bottom: 0.75rem;
}
.kirby-file-view dd a {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.kirby-box.kirby-file-viewer {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  box-shadow: $box-shadow-inset;
}
</style>
