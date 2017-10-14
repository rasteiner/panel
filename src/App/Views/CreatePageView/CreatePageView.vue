<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      icon="page"
      :breadcrumb="breadcrumb"
      :pagination="pagination">

      <kirby-fancy-input
        ref="title"
        class="kirby-page-title"
        key="create-page-title"
        :value="title"
        placeholder="Title …"
        tag="div"
        @input="updateTitle"
        @blur="confirmTitle" />


      <template slot="buttons-left" v-if="layout">
        <kirby-button icon="preview">
          {{ $t('page.preview') }}
        </kirby-button>
        <kirby-button icon="toggle-on">
          Draft
        </kirby-button>
        <kirby-dropdown>
          <kirby-button icon="cog">
            {{ $t('settings') }}
          </kirby-button>
        </kirby-dropdown>
      </template>

      <template slot="buttons-right" v-if="layout">
        <kirby-button icon="globe">
          {{ $store.state.translation.toUpperCase() }}
        </kirby-button>
      </template>

    </kirby-header>

    <div v-if="!layout">
      <kirby-headline :margin="true">Select a template</kirby-headline>
      <kirby-blueprints-section :in="page" @select="select" @single="preload"></kirby-blueprints-section>
    </div>

    <kirby-grid v-else class="kirby-sections" gutter="large" @click.native.stop.prevent>
      <kirby-column v-for="(column, columnIndex) in layout" :key="page.id + 'column-' + columnIndex" :width="column.width">
        <component
          v-for="(section, sectionIndex) in column.sections"
          :key="page.id + '-section-' + sectionIndex"
          :is="'kirby-' + section.type + '-section'"
          :page="page"
          v-bind="section" />
      </kirby-column>
    </kirby-grid>

  </kirby-view>

</template>

<script>

import Page from 'App/Api/Page.js';
import Blueprint from 'App/Api/Blueprint.js';
import slug from 'App/Helpers/slug.js';

export default {
  props: ['path'],
  data () {
    return {
      site: false,
      page: {
        title: null,
        parents: [],
      },
      title: null,
      template: null,
      layout: null,
      breadcrumb: []
    }
  },
  computed: {
    pagination () {
      return this.layout ? {
        prev: false,
        next: false
      } : null;
    }
  },
  created () {
    this.fetch();
  },
  mounted () {
    this.$refs.title.focus();
  },
  watch: {
    $route () {
      this.fetch();
    }
  },
  methods: {
    select (item) {
      if (this.title === null || this.title.length === 0) {
        this.$store.dispatch('error', 'Please enter a title');
        this.$refs.title.focus();
        return false;
      }

      Page.create(this.path, {
        slug: slug(this.title || ''),
        template: item.id,
        content: {
          title: this.title
        }
      }).then((page) => {
        this.$store.dispatch('success', 'The page was created');
        this.$router.push('/pages/' + page.id);
      }).catch(() => {
        this.$store.dispatch('error', 'The page could not be created');
        this.$router.push('/pages/' + this.page.id);
      });

    },
    updateTitle (title) {
      this.title = title.trim();
    },
    confirmTitle () {
      if (this.template) {
        this.select(this.template);
      }
    },
    preload (template) {
      Blueprint.get(template.id).then((blueprint) => {
        this.template = template.id;
        this.layout = blueprint.layout;
      });
    },
    fetch() {

      if (!this.path || this.path === '/') {

        Blueprint.get('site').then((blueprint) => {
          this.site       = true;
          this.page       = {id: '_site', title: 'Site', url: '/'};
          this.breadcrumb =  [];
        });

        return true;
      }

      Page.get(this.path).then((page) => {
        this.breadcrumb = Page.breadcrumb(page, true);

        Blueprint.get(page.template, page).then((blueprint) => {
          this.site = false;
          this.page = page;
        });

      }).catch(() => {
        this.$store.dispatch('error', 'The parent page could not be found');
        this.$router.push('/pages');
      });

    }
  }
}

</script>

<style lang="scss">

.kirby-page-view .kirby-page-title:focus {
  @include focus-ring;
  background: #fff;
}

</style>
