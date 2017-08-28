<template>
  <kirby-dropdown class="kirby-page-selector">
    <slot />
    <kirby-dropdown-content :dark="true" ref="dropdown">
      <ul>
        <li class="kirby-page-selector-item" v-if="path">
          <kirby-button @click="back" icon="angle-left" alt="Show Parent Pages" />
        </li>
        <li class="kirby-page-selector-item" v-for="page in pages" :key="page.id">
          <kirby-button @click="select(page.id)" icon="file-o">{{ page.title }}</kirby-button>
          <kirby-button v-if="page.hasChildren" @click="fetch(page.id)"
            icon="angle-right" alt="Show Child Pages" />
          <kirby-button v-else disabled icon="angle-right" />
        </li>
      </ul>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>

import Query from 'App/Api/Query.js'

export default {
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

      let params = {
        id: {
          type: 'String',
          value: id
        }
      };

      let select = 'title, id, hasChildren';

      Query('children', params, select).then(function (children) {
        this.pages = children;
      }.bind(this));

      this.path = id ? id + '/' : '';

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
