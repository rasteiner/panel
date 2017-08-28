<template>
  <component
    :is="'kirby-data-' + layout"
    :items="items"
    :pagination="pagination"
    @paginate="paginate"
    @action="action" />
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
