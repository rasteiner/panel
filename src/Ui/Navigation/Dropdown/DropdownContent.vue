<template>
  <div v-show="isOpen" class="kirby-dropdown-content" :data-align="align">
    <template v-if="items">
      <kirby-dropdown-item v-for="(option, index) in items"
        :key="index"
        v-bind="option"
        @click="$emit('action', option.click)">
          {{ option.text }}
      </kirby-dropdown-item>
    </template>
    <slot v-else />
  </div>
</template>

<script>
var OpenDropdown = null;

export default {
  props: {
    options: {},
    align: {
      type: String
    }
  },
  data() {
    return {
      items: null,
      isOpen: false
    };
  },
  created: function() {
    window.addEventListener("keyup", this.escape, false);
    document.addEventListener("click", this.close, false);
  },
  destroyed: function() {
    window.removeEventListener("keyup", this.escape, false);
    document.removeEventListener("click", this.close, false);
  },
  methods: {
    fetchOptions(ready) {
      if (this.options) {
        if (typeof this.options === "string") {
          fetch(this.options)
            .then(response => response.json())
            .then(json => {
              return ready(json);
            });
        } else if (typeof this.options === "function") {
          this.options(ready);
        } else if (typeof this.options === "object") {
          ready(this.options);
        }
      } else {
        return ready(this.items);
      }
    },
    open() {
      if (OpenDropdown && OpenDropdown !== this) {
        // close the current dropdown
        OpenDropdown.close();
      }

      this.fetchOptions(items => {
        this.isOpen = true;
        this.items = items;
        this.$emit("open");
        OpenDropdown = this;
      });
    },
    close() {
      this.isOpen = OpenDropdown = false;
      this.$emit("close");
    },
    toggle() {
      this.isOpen ? this.close() : this.open();
    },
    escape(e) {
      if (e.code === "Escape") {
        this.close();
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-dropdown-content {
  position: absolute;
  top: 100%;
  padding: 0.5rem 0;
  background: $color-dark;
  color: $color-white;
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
