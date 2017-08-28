<template>
  <button type="button" ref="button" class="kirby-tag" @keydown.8="remove" :data-size="size">
    <span class="kirby-tag-body">
      <span class="kirby-tag-text"><slot /></span>
      <span class="kirby-tag-toggle" v-if="removable" @click.stop="remove"><span>&times;</span></span>
    </span>
  </button>
</template>

<script>

export default {
  props: ['removable', 'size'],
  methods: {
    remove: function() {
      if(this.removable) {
        this.$emit('remove');
      }
    },
    focus: function() {
      this.$refs.button.focus();
    }
  }
}

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
  color: $color-dark;
}
.kirby-tag[data-size="small"] .kirby-tag-text {
  font-size: .8em;
  padding: 0rem .75rem;
}
.kirby-tag-body {
  position: relative;
  display: flex;
  align-items: stretch;
}
.kirby-tag-text {
  padding: .4rem .75rem;
}
.kirby-tag-toggle {
  position: relative;
  border-left: 1px solid rgba(255,255,255, .3);
  color: rgba(255,255,255, .7);
  width: 2rem;
}
.kirby-tag:focus .kirby-tag-toggle {
  border-left: 1px solid rgba($color-dark, .3);
  color: rgba($color-dark, .7);
}
.kirby-tag-toggle:hover {
  background: rgba(255,255,255, .2);
  color: #fff;
}
.kirby-tag-toggle span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -1px;
  margin-left: -1px;
  font-size: 1.1em;
  color: inherit;
}

</style>
