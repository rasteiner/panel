<template>
  <section>
    <kirby-files-collection
      :key="group"
      :headline="headline"
      :layout="layout"
      :query="query"
      :group="group"
      :max="max"
      :pagination="pagination"
    />
  </section>
</template>

<script>

export default {
  props: [
    'headline',
    'layout',
    'type',
    'parent',
    'page',
    'filterBy',
    'group',
    'pagination',
    'sortBy',
    'offset',
    'max'
  ],
  computed: {
    query () {
      return {
        parent: this.parent || this.page.id,
        filterBy: this.filterBy,
        sortBy: this.sortBy,
        offset: this.offset
      }
    }
  }
};

</script>
