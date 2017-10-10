<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      icon="page"
      :breadcrumb="breadcrumb">

      <kirby-fancy-input
        ref="title"
        class="kirby-page-title"
        key="create-page-title"
        :value="title"
        placeholder="Title …"
        tag="div"
        @input="updateTitle" />

    </kirby-header>

    <kirby-headline :margin="true">Select a template</kirby-headline>
    <kirby-collection layout="cards" @click="select" :items="blueprints"></kirby-collection>

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
      blueprints: []
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
  computed: {
    breadcrumb () {

      let crumb = [];

      if (this.site === false) {
        crumb = this.page.parents.map((parent) => {
          return {
            label: parent.title,
            link: '/pages/' + parent.id
          }
        });

        crumb.push({
          label: this.page.title,
          link: '/pages/' + this.page.id
        });

      }

      return crumb;

    }
  },
  methods: {
    select(item) {

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
        this.$router.push('/pages/' + page.id);
      });

    },
    image (blueprint) {
      return window.panel.config.index + '/assets/blueprints/' + blueprint + '.png';
    },
    updateTitle (title) {
      this.title = title;
    },
    fetch() {

      this.blueprints = [
        {
          id:   'default',
          text: 'Default',
          info: 'Just a text block',
          link: '#',
          image: {
            url: this.image('default')
          }
        },
        {
          id:   'article',
          text: 'Article',
          info: 'A blog article',
          link: '#',
          image: {
            url: this.image('article')
          }
        },
        {
          id:   'project',
          text: 'Project',
          info: 'A portfolio Project',
          link: '#',
          image: {
            url: this.image('project')
          }
        }
      ];


      if (!this.path || this.path === '/') {

        Blueprint.get('site').then((blueprint) => {
          this.site = true;
          this.page = {id: '_site', title: 'Site', url: '/'};
        });

        return true;
      }

      Page.get(this.path).then((page) => {
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

.kirby-page-view .kirby-page-title {
  padding-left: .5rem;
  padding-right: .5rem;
  width: calc(100% + 1rem);

  [dir="ltr"] & {
    margin-left: -.5rem;
  }
  [dir="rtl"] & {
    margin-right: -.5rem;
  }
}

.kirby-page-view .kirby-page-title:focus {
  @include focus-ring;
  background: #fff;
}

</style>
