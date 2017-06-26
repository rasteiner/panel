<template>
  <kirby-button-group class="kirby-pagination" v-if="total > 1" :data-align="align">
    <kirby-button :disabled="!hasPrev" @click="prev" icon="angle-left"></kirby-button>
    <kirby-dropdown v-if="details">
      <kirby-button @click="$refs.dropdown.toggle()" :disabled="!hasPages">
        <template v-if="total > 1">{{ start }}-{{ end }} /</template> {{ total }}
      </kirby-button>
      <kirby-dropdown-content @open="$nextTick(() => $refs.page.focus())" class="kirby-pagination-selector" :dark="true" ref="dropdown">
        <div>
          <label for="page">Page</label>
          <input id="page" ref="page" type="number" :value="currentPage" @input="goTo($event.target.value)" :min="1" :max="pages">
        </div>
      </kirby-dropdown-content>
    </kirby-dropdown>
    <kirby-button :disabled="!hasNext" @click="next" icon="angle-right"></kirby-button>
  </kirby-button-group>
</template>

<script>

import Button from '../../Buttons/Button/Button.vue'
import ButtonGroup from '../../Buttons/ButtonGroup/ButtonGroup.vue'
import Dropdown from '../../Navigation/Dropdown/Dropdown.vue'
import DropdownContent from '../../Navigation/Dropdown/DropdownContent.vue'
import NumberInput from '../../Forms/Inputs/NumberInput/NumberInput.vue'

const PaginationKeysListener = function (e) {

  switch (e.code) {
    case 'ArrowLeft':
      this.prev();
      break;
    case 'ArrowRight':
      this.next();
      break;
  }
  
}

export default {
  components: {
    'kirby-button': Button,
    'kirby-button-group': ButtonGroup,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-number-input': NumberInput
  },
  props: {
    align: {
      type: String,
      default: 'left'
    },
    details: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    keys: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    start() {
      return (this.currentPage - 1) * this.limit + 1;
    },
    end() {
      
      let value = (this.start - 1) + this.limit;

      if (value > this.total) {
        return this.total;
      } else {
        return value;
      }

    },
    pages() {
      return Math.ceil(this.total / this.limit);
    },
    hasPrev() {
      return this.start > 1;
    },
    hasNext() {
      return this.end < this.total;
    },
    hasPages() {
      return this.total > this.limit;
    }
  },
  data() {
    return {
      currentPage: this.page
    }
  },
  methods: {
    goTo(page) {

      if (page < 1) {
        page = 1;
      }
      
      if (page > this.pages) {
        page = this.pages;
      }

      this.currentPage = page;

    },
    prev() {
      this.goTo(this.currentPage - 1);
    },
    next() {
      this.goTo(this.currentPage + 1);
    }
  },
  created() {
    if (this.keys === true) {
      window.addEventListener('keydown', PaginationKeysListener.bind(this), false)      
    }
  },
  destroyed() {
    window.removeEventListener('keydown', PaginationKeysListener, false)
  }
}

</script>

<style lang="scss">

.kirby-pagination .kirby-button {
  padding: 1rem !important;
}
.kirby-pagination[data-align="center"] {
  text-align: center;
}
.kirby-pagination[data-align="right"] {
  text-align: right;
}

.kirby-pagination-selector {
  width: 100%;
}
.kirby-pagination-selector > div {
  font-size: 14px;
  display: flex;
  font-family: $font-family-mono;
}
.kirby-pagination-selector > div > label {
  padding: .5rem 1rem;  
  border-right: 1px solid rgba(#fff, .1);
}
.kirby-pagination-selector > div > input {
  flex-grow: 1;
  font: inherit;
  border: 0;
  background: 0;
  color: inherit;
  padding: .5rem 1rem;
}
.kirby-pagination-selector > div > input:focus {
  outline: 0;
  background: $color-positive;
  color: $color-dark;
}

</style>

