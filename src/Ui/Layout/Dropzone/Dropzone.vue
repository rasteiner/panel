<template>
  <div class="kirby-dropzone">
    <div v-show="dragging" class="kirby-dropzone-overlay">{{ command }}</div>
    <slot />
  </div>
</template>

<script>

export default {
  props: {
    command: {
      type: String,
      default: 'Drop to upload'
    }
  },
  data () {
    return {
      dragging: false,
      files: []
    }
  },
  mounted () {
    window.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.dragging = true;
    });
		window.addEventListener('dragleave', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.dragging = false;
    });
    this.$el.addEventListener("drop", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.dragging = false;
      this.files = e.target.files || e.dataTransfer.files;
      this.$emit('drop', this.files)
    });
  }
}

</script>

<style lang="scss">

  .kirby-dropzone {
    position: relative;
  }

  .kirby-dropzone-overlay {
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
    @include focus-ring;
    z-index: z-index('dialog');
  }

</style>
