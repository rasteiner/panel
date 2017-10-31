<template>
  <div class="kirby-upload">
    <input ref="input" tabindex="-1" type="file" @change="select" :accept="options.accept" :multiple="options.multiple">

    <kirby-dialog ref="dialog">
      <template v-if="errors.length > 0">
        <kirby-headline :margin="true">Upload errors</kirby-headline>
        <ul class="kirby-upload-error-list">
          <li :key="'error-' + index" v-for="(error, index) in errors">
            <p class="kirby-upload-error-filename">{{ error.file.name }}</p>
            <p class="kirby-upload-error-message">{{ error.message }}</p>
          </li>
        </ul>
      </template>
      <template v-else>
        <kirby-headline>Uploading …</kirby-headline>
        <ul class="kirby-upload-list">
          <li :key="'file-' + index" v-for="(file, index) in files">
            <kirby-progress :ref="file.name"></kirby-progress>
            <p class="kirby-upload-list-filename">{{ file.name }}</p>
            <p>{{ errors[file.name] }}</p>
          </li>
        </ul>
      </template>
      <template slot="footer">
        <footer v-if="errors.length > 0" class="kirby-dialog-footer">
          <kirby-button-group>
            <kirby-button @click="$refs.dialog.close()" icon="check">Ok</kirby-button>
          </kirby-button-group>
        </footer>
      </template>
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
    attributes: {
      type: Object
    },
    multiple: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number
    }
  },
  data () {
    return {
      options: this.$props,
      completed: {},
      errors: [],
      files: [],
      total: 0,
    };
  },
  methods: {
    open(params) {
      this.options = Object.assign({}, this.$props, params);
      this.$refs.input.click();
    },
    select (e) {
      this.upload(e.target.files);
    },
    upload (files) {

      this.$refs.dialog.open();

      this.files     = [...files];
      this.completed = {};
      this.errors    = [];
      this.hasErrors = false;

      if (this.options.max) {
        this.files = this.files.slice(0, this.options.max);
      }

      this.total = this.files.length;
      this.files.forEach((file) => {

        uploadFile(file, {
          url: this.options.url,
          attributes: this.options.attributes,
          progress: (xhr, file, progress) => {
            this.$refs[file.name][0].set(progress);
          },
          success: (xhr, file, response) => {
            this.complete(file);
          },
          error: (xhr, file, response) => {
            this.errors.push({file: file, message: response.message});
            this.complete(file, response.message);
          }
        });

      });

    },
    complete (file) {

      this.completed[file.name] = true;

      if (Object.keys(this.completed).length == this.total) {

        // remove the selected file
        this.$refs.input.value = '';

        if (this.errors.length > 0) {
          this.$forceUpdate();
          return;
        }

        setTimeout(() => {
          this.$refs.dialog.close();
          this.$emit('success');
        }, 250);

      }
    }
  }
}

</script>

<style lang="scss">

  .kirby-upload input {
    position: absolute;
    top: 0;
    left: -3000px;
  }

  .kirby-upload-list,
  .kirby-upload-error-list {
    font-family: $font-family-mono;
    line-height: 1.5em;
    font-size: $font-size-small;
  }
  .kirby-upload-list-filename {
    color: $color-dark-grey;
  }

  .kirby-upload-error-list li {
    padding: .75rem;
    background: $color-white;
    border-radius: $border-radius;
  }
  .kirby-upload-error-list li:not(:last-child) {
    margin-bottom: 2px;
  }
  .kirby-upload-error-filename {
    margin-bottom: .75rem;
    color: $color-negative;
  }
  .kirby-upload-error-message {
    color: $color-dark-grey;
  }

</style>
