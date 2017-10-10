<template>
  <section>
    <kirby-headline>
      <span>{{ headline }}</span>
    </kirby-headline>
    <kirby-files-collection
      :layout="layout"
      :query="query"
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
    'pagination',
    'sortBy'
  ],
  computed: {
    query () {
      return {
        parent: this.parent || this.page.id,
        filterBy: this.filterBy,
        sortBy: this.sortBy
      }
    }
  }
};

</script>
