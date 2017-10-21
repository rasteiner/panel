<template>

  <kirby-view class="kirby-create-page-view" v-if="complete">

    <kirby-header :label="$t('page.list')" link="/pages" icon="page" :breadcrumb="breadcrumb">

      <kirby-fancy-input
        ref="title"
        class="kirby-create-page-view-title"
        key="create-page-title"
        :value="title"
        placeholder="Title …"
        tag="div" />

    </kirby-header>

    <kirby-headline :margin="true">Select a template</kirby-headline>
    <kirby-collection class="kirby-create-page-view-blueprints" layout="cards" :items="blueprints" @click="create" />

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
      title: null,
      complete: false,
      breadcrumb: [],
      blueprints: []
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch() {

      Page.blueprints(this.path).then((blueprints) => {

        if (blueprints.length === 0) {
          this.$router.push('/pages/' + this.path);
          this.$store.dispatch('error', 'You are not allowed to add any subpages');
          return;
        }

        this.blueprints = blueprints.map((blueprint) => {
          return {
            id:   blueprint.name,
            text: blueprint.title || item.name,
            info: blueprint.description || '',
            image: {
              url: this.image(blueprint.name)
            }
          }
        });

        if (blueprints.length === 1) {
          this.create(this.blueprints[0]);
          return;
        }

        this.setup();

      });

    },
    setup () {

      if (!this.path || this.path === '/') {
        this.breadcrumb = [];
        this.complete   = true;
        return true;

      } else {
        Page.get(this.path).then((page) => {
          this.breadcrumb = Page.breadcrumb(page, true);
          this.complete   = true;
        });
      }

    },
    image (blueprint) {
      return window.panel.config.index + '/assets/blueprints/' + blueprint + '.png';
    },
    create (blueprint) {

      Page.create(this.path, {
        slug: slug(this.title || 'untitled'),
        template: blueprint.id,
        content: {
          title: this.title || ''
        }
      }).then((page) => {
        this.$store.dispatch('success', 'The page was created');
        this.$router.push('/pages/' + page.id);
      }).catch(() => {
        this.$store.dispatch('error', 'The page could not be created');
        this.$router.push('/pages/' + this.path);
      });

    }
  }
}

</script>

<style lang="scss">

.kirby-create-page-view-title:focus {
  @include focus-ring;
  background: #fff;
}

.kirby-create-page-view-blueprints .kirby-card {
  cursor: pointer;
}

</style>
