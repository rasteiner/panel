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
  background: #fff;
  z-index: 1000;
  text-align: left;
  color: $color-dark;
  box-shadow: rgba(0,0,0, .1) 0 5px 10px;
  border-radius: 3px;
}
.kirby-dropdown-content[data-align="right"] {
  left: auto;
  right: 0;
}
.kirby-dropdown-content[data-dark] {
  background: $color-dark;
  color: #fff;
}
.kirby-dropdown-content[data-dark] .kirby-dropdown-item {
  border-bottom: 1px solid rgba(255,255,255, .2);
}
.kirby-dropdown-item:last-child {
  border-bottom: 0;
}

</style>
