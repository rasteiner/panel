<template>
  <kirby-dropdown class="kirby-page-selector">
    <slot />
    <kirby-dropdown-content :dark="true" ref="dropdown">
      <ul>
        <li class="kirby-page-selector-item" v-if="path">
          <kirby-button @click="back" icon="angle-left" />
        </li>
        <li class="kirby-page-selector-item" v-for="page in pages" :key="page.id">
          <kirby-button @click="select(page.id)" icon="file-o">{{ page.title }}</kirby-button>
          <kirby-button :disabled="!page.children" @click="fetch(page.id)" icon="angle-right" />
        </li>
      </ul>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>

import Button from 'Buttons/Button/Button.vue'
import Dropdown from 'Navigation/Dropdown/Dropdown.vue'
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue'
import DropdownItem from 'Navigation/Dropdown/DropdownItem.vue'
import Icon from 'Images/Icon/Icon.vue'

export default {
  components: {
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem
  },
  data() {
    return {
      pages: [],
      path: null
    }
  },
  mounted() {
    this.$refs.dropdown.open();
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch(id) {        
      this.path = id ? id + '/' : '';
      fetch('/mock/data/pages/' + this.path + 'pages.json')
        .then(function (response) {
          return response.json();
        })
        .then(function (pages) {
          this.pages = pages;
        }.bind(this));
    },
    back() {
      this.fetch(this.path.split('/').slice(0, -2).join('/'));
    },
    select(id) {
      this.$emit('select', id);
      this.$refs.dropdown.close();
    },
    open() {
      this.fetch();
      this.$refs.dropdown.open();
    }
  }
}

</script>

<style lang="scss">

.kirby-page-selector-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-bottom: 1px solid rgba(#fff, .1);
}
.kirby-page-selector-item .kirby-button {
  padding: .5rem 1rem;
  color: inherit;
}
.kirby-page-selector-item .kirby-button:hover,
.kirby-page-selector-item .kirby-button:focus {
  color: $color-positive !important;
}
.kirby-page-selector-item .kirby-button:last-child:hover .kirby-icon {
  color: inherit;
}
.kirby-page-selector-item .kirby-button:first-child {
  flex-grow: 1;
  text-align: left;
}

</style>
