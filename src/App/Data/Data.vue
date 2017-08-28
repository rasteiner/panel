<template>
  <kirby-data-cards v-if="layout == 'cards'"
    :items="items"
    :pagination="pagination"
    @paginate="paginate"
    @action="action"
  />
  <kirby-data-list v-else
    :items="items"
    :pagination="pagination"
    @paginate="paginate"
    @action="action"
  />
</template>

<script>

export default {
  props: ['layout', 'items', 'pagination'],
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
