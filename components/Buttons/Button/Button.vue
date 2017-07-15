<template>
  <button
    type="button"
    class="kirby-button"
    @click="click"
    :disabled="disabled"
    :title="title"
    :data-state="state"
    :data-has-image="image ? true : false">
    <kirby-icon v-if="icon" :type="icon" :alt="alt"></kirby-icon>
    <img v-else-if="image" class="kirby-button-image" :src="image" :alt="alt || ''">
    <span v-if="$slots.default" class="kirby-button-text"><slot /></span>
    <input v-if="upload" type="file" ref="input"
      :multiple="upload.multiple || false"
      :accept="upload.accept || '*'"
      @change="change">
  </button>
</template>

<script>

import Icon from 'Images/Icon/Icon.vue'

export default {
  components: {
    'kirby-icon': Icon
  },
  props: [
    'title',
    'alt',
    'icon',
    'image',
    'state',
    'upload',
    'link',
    'disabled'
  ],
  computed: {
    component: function () {
      return this.link ? 'router-link' : 'button'
    }
  },
  methods: {
    click: function () {
      if (this.upload) {
        // open the file dialog
        this.$refs.input.value = ''
        this.$refs.input.click()
      } else if (this.link) {
        this.$router.push(this.link)
      }
      this.$emit('click')
    },
    change: function (event) {
      this.$emit('upload')
    }
  }
}

</script>

<style lang="scss">

.kirby-button {
  position: relative;
  background: none;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  line-height: inherit;
  border: 0;
  cursor: pointer;
  color: $color-dark-grey;
  transition: color .3s;

  &:focus,
  &:hover {
    outline: 0;
    color: $color-dark;
  }

  * {
    vertical-align: middle;
  }

  .kirby-icon {
    position: relative;
    color: $color-dark;
  }

  .kirby-icon ~ .kirby-button-text {
    padding-left: .25rem;
  }

}

.kirby-button[disabled] {
  pointer-events: none;
  opacity: .25;
}

.kirby-button[data-state="positive"] {
  color: $color-positive;

  &:hover {
    color: $color-dark;
  }

  .kirby-icon {
    color: $color-positive;
  }

}

.kirby-button[data-state="negative"] {
  color: $color-negative;

  &:hover {
    color: $color-dark;
  }

  .kirby-icon {
    color: $color-negative;
  }

}

.kirby-button[data-has-image] {
  width: 100%;
  text-align: left;

  .kirby-button-text {
    padding: 0;
  }

}

.kirby-button input[type="file"] {
  position: absolute;
  top: 0;
  left: -5000px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.kirby-button-image {
  width: 1.5rem;
  height: 1.5rem;
  margin: -.5rem .25rem -.5rem 0;
  border-radius: 50%;
  background: $color-dark;
  object-fit: cover;
}

.kirby-button-text span {
  vertical-align: baseline;
}

</style>
