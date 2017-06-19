<template>
  <div v-if="isOpen" class="kirby-dropdown-content" :data-dark="dark" :data-align="align">
    <span v-if="dropdownItems">
      <kirby-dropdown-item v-for="(option, index) in dropdownItems" 
        :key="index"
        :icon="option.icon" 
        :upload="option.upload"
        @click="$emit('action', option.click)">
          {{ option.text }}
      </kirby-dropdown-item>
    </span>
    <slot v-else />
  </div>
</template>

<script>

import DropdownItem from './DropdownItem.vue'

var OpenDropdown = null

const DropdownEscapeListener = function (e) {
  if (e.code === 'Escape') {
    this.close()
  }
}

const DropdownClickListener = function (e) {
  this.close()
}

export default {
  components: {
    'kirby-dropdown-item': DropdownItem
  },
  props: [
    'dark',
    'options',
    'align'
  ],
  data: function () {
    return {
      isOpen: false,
      dropdownItems: null
    }
  },
  created: function () {
    window.addEventListener('keyup', DropdownEscapeListener.bind(this), false)
    document.addEventListener('click', DropdownClickListener.bind(this), false)
  },
  destroyed: function () {
    window.removeEventListener('keyup', DropdownEscapeListener, false)
    document.removeEventListener('click', DropdownClickListener, false)
  },
  methods: {
    fetchOptions: function (callback) {
      if (this.options) {
        if (typeof this.options === 'string') {
          fetch(this.options).then(function (response) {
            return response.json()
          }).then(function (json) {
            this.dropdownItems = json
            return callback()
          }.bind(this))
        } else if (typeof this.options === 'object') {
          this.dropdownItems = this.options
        }
        return callback()
      } else {
        return callback()
      }
    },
    open: function () {
      if (OpenDropdown && OpenDropdown !== this) {
        // close the current dropdown
        OpenDropdown.close()
      }

      this.fetchOptions(function () {
        this.isOpen = true
        OpenDropdown = this
      }.bind(this))
    },
    close: function () {
      this.isOpen = OpenDropdown = false
    },
    toggle: function () {
      this.isOpen ? this.close() : this.open()
    }
  }
}

</script>

<style lang="scss">

.kirby-dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: $color-white;
  z-index: z-index(dropdown);
  text-align: left;
  color: $color-dark;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
}

.kirby-dropdown-content[data-align="right"] {
  left: auto;
  right: 0;
}

.kirby-dropdown-content[data-dark] {
  background: $color-dark;
  color: $color-light;

  .kirby-dropdown-item {
    border-bottom: 1px solid rgba(255,255,255, .2);
    color: lighten($color-light-grey, 10%);
  }

  .kirby-button:hover {
    color: #fff;
  }

  .kirby-button .kirby-icon {
    color: #fff;
  }

}

.kirby-dropdown-item:last-child {
  border-bottom: 0;
}

</style>
