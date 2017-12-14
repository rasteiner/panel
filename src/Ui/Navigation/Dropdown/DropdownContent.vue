<template>
  <div v-show="isOpen" class="kirby-dropdown-content" :data-align="align">
    <template v-if="items">
      <kirby-dropdown-item v-for="(option, index) in items"
        :key="index"
        :icon="option.icon"
        :upload="option.upload"
        @click="$emit('action', option.click)">
          {{ option.text }}
      </kirby-dropdown-item>
    </template>
    <slot v-else />
  </div>
</template>

<script>

var OpenDropdown = null

export default {
  props: {
    options: {},
    align: {
      type: String
    }
  },
  data () {
    return {
      items: null,
      isOpen: false
    }
  },
  created: function () {
    window.addEventListener('keyup', this.escape, false)
    document.addEventListener('click', this.close, false)
  },
  destroyed: function () {
    window.removeEventListener('keyup', this.escape, false)
    document.removeEventListener('click', this.close, false)
  },
  methods: {
    fetchOptions (callback) {
      if (this.options) {
        if (typeof this.options === 'string') {
          fetch(this.options).
            then((response) => response.json()).
            then((json) => {
              this.items = json
              return callback()
            })

        } else if (typeof this.options === 'object') {
          this.items = this.options
        }
        return callback()
      } else {
        return callback()
      }
    },
    open () {
      if (OpenDropdown && OpenDropdown !== this) {
        // close the current dropdown
        OpenDropdown.close()
      }

      this.fetchOptions(() => {
        this.isOpen = true
        this.$emit('open')
        OpenDropdown = this
      })
    },
    close () {
      this.isOpen = OpenDropdown = false
      this.$emit('close')
    },
    toggle () {
      this.isOpen ? this.close() : this.open()
    },
    escape (e) {
      if (e.code === 'Escape') {
        this.close()
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-dropdown-content {
  position: absolute;
  top: 100%;
  padding: .5rem 0;
  background: $color-dark;
  color: $color-light;
  z-index: z-index(dropdown);
  box-shadow: $box-shadow;
  border-radius: $border-radius;

  [dir="ltr"] & {
    left: 0;
    text-align: left;
  }
  [dir="rtl"] & {
    right: 0;
    text-align: right;
  }
}

.kirby-dropdown-content[data-align="right"] {
  [dir="ltr"] & {
    left: auto;
    right: 0;
  }
  [dir="rtl"] & {
    right: auto;
    left: 0;
  }
}

.kirby-dropdown-item:last-child {
  border-bottom: 0;
}

</style>
