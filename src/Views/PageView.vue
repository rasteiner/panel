<template>

  <kirby-view class="kirby-page-view">

    <kirby-header label="Page List" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination">

      <kirby-fancy-input :key="page.id + '-title'" :value="page.title" tag="div" @blur="updateTitle" />

      <template slot="buttons-left">
        <kirby-button icon="play-circle" @click="action('preview')">Preview</kirby-button>
        <kirby-button v-if="!site" icon="toggle-on" @click="action('status')">Draft</kirby-button>
        <kirby-dropdown v-if="!site">
          <kirby-button @click="$refs.settings.toggle()" icon="cog">Settings</kirby-button>
          <kirby-dropdown-content :dark="true" ref="settings">
            <kirby-dropdown-item icon="clipboard" @click="action('copy')">Copy</kirby-dropdown-item>
            <kirby-dropdown-item icon="code" @click="action('template')">Change Template</kirby-dropdown-item>
            <kirby-dropdown-item icon="chain" @click="action('url')">Change URL</kirby-dropdown-item>
            <kirby-dropdown-item icon="trash" @click="action('remove')">Delete</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
      </template>

      <template slot="buttons-right">
        <kirby-languages></kirby-languages>
      </template>

    </kirby-header>

    <kirby-grid v-if="page" gutter="large">
      <kirby-column v-for="(column, columnIndex) in layout" :key="page.id + '-column-' + columnIndex" :width="column.width">
        <component v-for="(section, sectionIndex) in column.sections" :key="page.id + '-section-' + sectionIndex" :is="'kirby-' + section.type + '-section'" v-bind="section" />
      </kirby-column>
    </kirby-grid>

    <kirby-page-url-dialog ref="url"></kirby-page-url-dialog>
    <kirby-page-remove-dialog ref="remove"></kirby-page-remove-dialog>

  </kirby-view>

</template>

<script>


import PageQuery from '@/Api/PageQuery.js';
import LayoutQuery from '@/Api/LayoutQuery.js';

export default {
  data() {
    return {
      site: false,
      page: {
        title: '',
        id: ''
      },
      icon: 'file-o',
      breadcrumb: [],
      pagination: {},
      layout: []
    }
  },
  created() {
    this.fetch();
  },
  computed: {
    path() {
      return this.$route.params.page || '/';
    }
  },
  watch: {
    $route() {
      this.fetch();
    }
  },
  methods: {
    fetch() {

      if (this.path === '/') {
        this.site       = true;
        this.page       = {id: '_site', title: 'Site', url: '/'};
        this.breadcrumb = [];
        this.layout     = LayoutQuery('site');
        return true;
      }

      PageQuery(this.path).then(function (page) {
        this.site       = false;
        this.page       = page;
        this.breadcrumb = page.breadcrumb;
        this.layout     = LayoutQuery(this.page.template, this.page);
      }.bind(this));

    },
    updateTitle () {
      this.$store.dispatch('success', 'The page title has been updated');
    },
    action (action) {
      switch (action) {
        case 'preview':
          window.open(this.page.url);
          break;
        case 'url':
          this.$refs.url.open(this.page.id);
          break;
        case 'remove':
          this.$refs.remove.open(this.page.id);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-page-view .kirby-column section:not(:last-child) {
    margin-bottom: 1.5rem;
}

</style>
