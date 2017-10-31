<template>
  <div class="kirby-pages-collection">

    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <kirby-button v-show="!isLoading" icon="add" @click="add">Add</kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="isLoading">
      <template>
        <kirby-skeleton type="list" />
      </template>
    </template>
    <template v-else>

      <kirby-collection
        :layout="layout"
        :items="items"
        :pagination="paginationOptions"
        @paginate="paginate"
        @action="action"
      />

      <kirby-box v-if="items.length === 0">
        <kirby-button>No entries</kirby-button>
      </kirby-box>

      <kirby-page-create-dialog ref="create" @success="$emit('create')" />
      <kirby-page-url-dialog ref="url" @success="$emit('url')" />
      <kirby-page-status-dialog ref="status" @success="$emit('status')" />
      <kirby-page-remove-dialog ref="remove" @success="$emit('remove')" />

    </template>

  </div>
</template>

<script>

import CollectionMixin from '../Collection.mixin.js';

export default {
  mixins: [CollectionMixin],
  mounted () {
    this.$events.$on('page.change.status', this.fetch);
  },
  destroyed () {
    this.$events.$off('page.change.status', this.fetch);
  },
  methods: {
    add () {
      this.$refs.create.open(this.query.parent);
    },
    fetch () {

      this.query.paginate = {
        page:  this.page,
        limit: this.pagination.limit
      };

      let children;

      if (this.query.parent && this.query.parent !== '/') {
        children = this.$api.page.children(this.query.parent, this.query);
      } else {
        children = this.$api.site.children(this.query);
      }

      this.isLoading = true;

      children.then((response) => {

        this.total = response.pagination.total;
        this.items = response.items.map((page) => ({
          id: page.id,
          image: page.image || {},
          text: page.title,
          url: page.url,
          link: '/pages/' + page.id,
          options: window.panel.config.api + '/pages/' + page.id + '/options'
        }));

        this.isLoading = false;

      }).catch((error) => {
        this.isLoading = false;
        this.$store.dispatch('error', error.message);
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
        case 'status':
          this.$refs.status.open(page.id);
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

<style lang="scss">

.kirby-pages .kirby-image img[src*=".svg"] {
  object-fit: none;
}

</style>
