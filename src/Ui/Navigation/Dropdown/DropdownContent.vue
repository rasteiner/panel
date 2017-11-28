<template>
  <div v-show="isOpen" class="kirby-dropdown-content" :data-align="align">
    <template v-if="dropdownItems">
      <kirby-dropdown-item v-for="(option, index) in dropdownItems"
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

const DropdownEscapeListener = function (e) {
  if (e.code === 'Escape') {
    this.close()
  }
}

const DropdownClickListener = function (e) {
  this.close()
}

export default {
  props: [
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
        this.$emit('open');
        OpenDropdown = this
      }.bind(this))
    },
    close: function () {
      this.isOpen = OpenDropdown = false
      this.$emit('close');
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
