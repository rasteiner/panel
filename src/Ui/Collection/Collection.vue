<template>

  <div class="kirby-collection">
    <component
      :is="'kirby-' + layout + '-collection'"
      :items="items"
      :pagination="paginationOptions"
      @paginate="paginate"
      @action="action" />

    <kirby-pagination
      v-if="paginationOptions.hide !== true"
      v-bind="paginationOptions"
      @paginate="$emit('paginate', $event)" />

  </div>

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
  computed: {
    paginationOptions () {
      return {
        limit: 10,
        align: 'center',
        details: true,
        keys: false,
        hide: false,
        total: 0,
        ...this.pagination
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
  }
}

</script>
