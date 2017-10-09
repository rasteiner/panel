<template>
  <div class="kirby-pages-collection">
    <kirby-collection
      :layout="layout"
      :items="items"
      :pagination="paginationOptions"
      @paginate="paginate"
      @action="action"
    />
    <kirby-page-url-dialog ref="url" @success="$emit('url')" />
    <kirby-page-remove-dialog ref="remove" @success="$emit('remove')" />
  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';

import Site from 'App/Api/Site.js';
import Page from 'App/Api/Page.js';

export default {
  mixins: [CollectionMixin],
  methods: {
    fetch () {

      this.query.pagination = {
        page:  this.page,
        limit: this.pagination.limit
      };

      let children;

      if (this.query.parent && this.query.parent !== '/') {
        children = Page.children(this.query.parent, this.query);
      } else {
        children = Site.children(this.query);
      }

      children.then((response) => {

        this.total = response.pagination.total;
        this.items = response.items.map((page) => ({
          id: page.id,
          image: page.image || {},
          text: page.content.title,
          link: '/pages/' + page.id,
          options: panel.config.assets + '/options/page.json'
        }));

      });

    },
    action(page, action) {
      switch(action) {
        case 'preview':
          window.open(page.url);
          break;
        case 'url':
          this.$refs.url.open(page.id);
          break;
        case 'remove':
          this.$refs.remove.open(page.id);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    }
  }
}

</script>

<style>

.kirby-pages .kirby-image img[src*=".svg"] {
  object-fit: none;
}

</style>
