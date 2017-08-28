<template>
  <div class="kirby-pages">
    <kirby-data v-bind="setup" @paginate="paginate" @action="action" />
    <kirby-page-url-dialog ref="url" />
    <kirby-page-remove-dialog ref="remove" />
  </div>
</template>

<script>

import DataLayoutsMixin from 'Data/DataLayouts.mixin.js';
import ChildrenQuery from '@/Api/ChildrenQuery.js';

export default {
  mixins: [DataLayoutsMixin],
  methods: {
    fetch () {

      this.query.pagination = {
        page:  this.page,
        limit: this.pagination.limit
      };

      ChildrenQuery(this.query).then((response) => {
        this.total = response.pagination.total;
        this.items = response.pages.map(function(page) {
          return {
            id: page.id,
            image: page.image,
            text: page.title,
            info: page.id,
            link: page.link,
            options: '/options/page.json'
          }
        });
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
