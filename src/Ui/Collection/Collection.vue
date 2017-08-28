<template>
  <component
    :is="'kirby-' + layout + '-collection'"
    :items="items"
    :pagination="paginationOptions"
    @paginate="paginate"
    @action="action" />
</template>

<script>

import Cards from './Layouts/Cards.vue';
import List from './Layouts/List.vue';

export default {
  components: {
    'kirby-cards-collection': Cards,
    'kirby-list-collection': List
  },
  props: {
    layout: {
      type: String,
      default: 'list'
    },
    items: {
      type: Array,
      default () {
        return [];
      }
    },
    pagination: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    paginate (pagination) {
      this.$emit('paginate', pagination);
    },
    action (item, action) {
      this.$emit('action', item, action);
    }
  },
  computed: {
    paginationOptions () {
      return Object.assign({
          page: 1,
          limit: 10,
          align: 'center',
          details: true,
          keys: false,
          hide: false,
          total: 0
      }, this.pagination);
    }
  }
}

</script>
