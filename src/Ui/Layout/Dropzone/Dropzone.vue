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
      default: "Drop file here"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: [],
      dragging: false
    };
  },
  mounted() {
    if (this.disabled === false) {
      window.addEventListener("dragover", this.start, false);
      window.addEventListener("dragleave", this.stop, false);
      this.$el.addEventListener("drop", this.drop, false);
      this.$events.$on("dropzone.drop", this.reset, false);
    }
  },
  dstroyed() {
    if (this.disabled === false) {
      window.removeEventListener("dragover", this.start, false);
      window.removeEventListener("dragleave", this.stop, false);
      this.$el.removeEventListener("drop", this.drop, false);
      this.$events.$off("dropzone.drop", this.reset, false);
    }
  },
  methods: {
    prevent(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    reset() {
      this.dragging = false;
    },
    start(e) {
      this.prevent(e);
      this.dragging = true;
    },
    stop(e) {
      this.prevent(e);
      this.reset();
    },
    drop(e) {
      this.prevent(e);
      this.$events.$emit("dropzone.drop");

      let files = e.target.files || e.dataTransfer.files;
      this.files = files;
      this.$emit("drop", files);
    }
  }
};
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
  background: darken($color-inset, 5%);
  box-shadow: $color-border 0 0 0 1px inset, $box-shadow-inset;
  z-index: z-index("focusmode");
  @include focus-ring;
}
</style>
