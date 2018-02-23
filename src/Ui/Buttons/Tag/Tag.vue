<template>
  <button type="button" ref="button" class="kirby-tag" @keydown.delete="remove" :data-size="size">
    <span class="kirby-tag-body">
      <span class="kirby-tag-text"><slot /></span>
      <span class="kirby-tag-toggle" v-if="removable" @click.stop="remove"><span>&times;</span></span>
    </span>
  </button>
</template>

<script>
export default {
  props: ["removable", "size"],
  methods: {
    remove() {
      if (this.removable) {
        this.$emit("remove");
      }
    },
    focus() {
      this.$refs.button.focus();
    }
  }
};
</script>

<style lang="scss">
.kirby-tag {
  position: relative;
  font-family: $font-family-mono;
  font-size: $font-size-small;
  line-height: inherit;
  border: 0;
  cursor: pointer;
  color: inherit;
  background-color: $color-dark;
  color: $color-light;
  border-radius: $border-radius;
}
.kirby-tag:focus {
  outline: 0;
  background-color: $color-focus;
  border-color: $color-focus;
  color: #fff;
}
.kirby-tag[data-size="small"] .kirby-tag-text {
  font-size: 0.8em;
  padding: 0rem 0.75rem;
}
.kirby-tag-body {
  position: relative;
  display: flex;
  align-items: stretch;
}
.kirby-tag-text {
  padding: 0.4rem 0.75rem;
}
.kirby-tag-toggle {
  position: relative;
  color: rgba(255, 255, 255, 0.7);
  width: 2rem;

  [dir="ltr"] & {
    border-left: 1px solid rgba(255, 255, 255, 0.3);
  }
  [dir="rtl"] & {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }
}
.kirby-tag-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.kirby-tag-toggle span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1em;
  color: inherit;

  [dir="ltr"] & {
    margin-left: -1px;
  }
  [dir="rtl"] & {
    margin-right: -1px;
  }
}
</style>
