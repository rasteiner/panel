<template>
  <div class="kirby-upload">
    <input ref="input" tabindex="-1" type="file" @change="select" :accept="options.accept" :multiple="options.multiple">

    <kirby-dialog ref="dialog">
      <template>
        <kirby-headline>Uploading …</kirby-headline>
        <ul class="kirby-upload-list">
          <li :key="'file-' + index" v-for="(file, index) in files">
            <kirby-progress :ref="file.name"></kirby-progress>
            <span class="kirby-upload-list-filename">{{ file.name }}</span>
          </li>
        </ul>
      </template>
      <template slot="footer"></template>
    </kirby-dialog>

  </div>
</template>

<script>

import uploadFile from 'Ui/Helpers/uploadFile.js';

export default {
  props: {
    url: {
      type: String
    },
    accept: {
      type: String,
      default: '*'
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      options: this.$props,
      completed: {},
      files: null,
      total: 0
    }
  },
  methods: {
    open(params) {
      this.params(params);
      this.$nextTick(() => {
        this.$refs.input.click();
      });
    },
    select (e) {
      this.upload(e.target.files);
    },
    upload (files) {

      this.$refs.dialog.open();

      this.files     = files;
      this.total     = 0;
      this.completed = {};

      for (var i = 0; i < this.files.length; i++) {

        let file = this.files[i];

        this.total++;

        uploadFile(file, {
          url: this.options.url,
          progress: (xhr, file, progress) => {
            this.$refs[file.name][0].set(progress);
          },
          success: () => {
            this.complete(file);
          },
          error: () => {
            this.complete(file);
          }
        });

      }

    },
    complete (file) {

      this.completed[file.name] = true;

      if (Object.keys(this.completed).length == this.total) {
        setTimeout(() => {
          this.$refs.dialog.close();
          this.$refs.input.value = '';
          this.$emit('success');
        }, 250);
      }
    },
    params (params) {
      this.options = Object.assign({}, this.$props, params);
    }
  }
}

</script>

<style lang="scss">

  .kirby-upload input {
    position: absolute;
    top: 0;
    left: -3000px;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .kirby-upload-list {
    font-family: $font-family-mono;
    line-height: 1.5em;
    font-size: $font-size-small;
  }
  .kirby-upload-list-filename {
    color: $color-dark-grey;
  }

</style>
