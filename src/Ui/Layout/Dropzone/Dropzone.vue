<template>
  <div class="kirby-dropzone">
    <div v-show="dragging" class="overlay">{{ label }}</div>
    <div v-show="error" class="error">{{ error }}</div>
    <slot />
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: 'Drop file here'
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
      files: [],
      dragging: false,
      error: ''
    }
  },
  mounted () {
    window.addEventListener('dragover', this.start, false);
		window.addEventListener('dragleave', this.stop, false);
    this.$el.addEventListener("drop", this.drop, false);
  },
  dstroyed () {
    window.removeEventListener('dragover', this.start, false);
		window.removeEventListener('dragleave', this.stop, false);
    this.$el.removeEventListener("drop", this.drop, false);
  },
  methods: {
    prevent (e) {
      e.stopPropagation();
      e.preventDefault();
    },
    start (e) {
      this.prevent(e);
      this.error = '';
      this.dragging = true;
    },
    stop (e) {
      this.prevent(e);
      this.dragging = false;
    },
    drop (e) {
      this.prevent(e);
      this.dragging = false;

      let files = e.target.files || e.dataTransfer.files;
      this.validate(files);

      if(this.error === '') {
        this.files = files;
        this.$emit('drop', files)
      }
    },
    validate (files) {
      if (this.multiple === false && files.length > 1) {
        this.error = 'Only one file allowed';
        return false;
      }

      if (this.accept !== '*') {
        for (var i = 0; i < files.length; i++) {
          if (files[i].type !== this.accept) {
            this.error = 'File type not allowed';
            return false;
          }
        }
      }
    }
  }
}

</script>

<style lang="scss">

  .kirby-dropzone {
    position: relative;
  }

  .kirby-dropzone .overlay,
  .kirby-dropzone .error {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background: rgba($color-white ,.75);
    z-index: z-index('dialog');
  }

  .kirby-dropzone .overlay {
    @include focus-ring;
  }

  .kirby-dropzone .error {
    box-shadow: 0 0 0 2px $color-negative, 0 0 0 5px rgba($color-negative, .2);
    outline: none;
    border-radius: $border-radius;
  }

</style>
