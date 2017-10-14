<template>
  <div class="kirby-dropzone">
    <div v-show="dragging" class="overlay">{{ label }}</div>
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
      dragging: false
    }
  },
  mounted () {
    window.addEventListener('dragover', this.start, false);
		window.addEventListener('dragleave', this.stop, false);
    this.$el.addEventListener('drop', this.drop, false);
    this.$events.$on('dropzone.drop', this.reset, false);
  },
  dstroyed () {
    window.removeEventListener('dragover', this.start, false);
		window.removeEventListener('dragleave', this.stop, false);
    this.$el.removeEventListener('drop', this.drop, false);
    this.$events.$off('dropzone.drop', this.reset, false);
  },
  methods: {
    prevent (e) {
      e.stopPropagation();
      e.preventDefault();
    },
    reset () {
      this.dragging = false;
    },
    start (e) {
      this.prevent(e);
      this.dragging = true;
    },
    stop (e) {
      this.prevent(e);
      this.reset();
    },
    drop (e) {
      this.prevent(e);
      this.$events.$emit('dropzone.drop');

      let files = e.target.files || e.dataTransfer.files;
      let validate = this.validate(files);

      if (validate !== true) {
        this.$store.dispatch('error', validate);
        return false;
      }

      this.files = files;
      this.$emit('drop', files)
    },
    validate (files) {
      if (this.multiple === false && files.length > 1) {
        return 'Only one file allowed';
      }

      if (this.accept !== '*') {
        for (var i = 0; i < files.length; i++) {
          if (files[i].type !== this.accept) {
            return 'File type not allowed';
          }
        }
      }

      return true;
    }
  }
}

</script>

<style lang="scss">

  .kirby-dropzone {
    position: relative;
  }

  .kirby-dropzone .overlay {
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
    @include focus-ring;
  }

</style>
