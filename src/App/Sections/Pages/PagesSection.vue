<template>
  <section>
    <kirby-pages-collection
      ref="pages"
      :headline="headline"
      :layout="layout"
      :query="query"
      :pagination="pagination"
      @remove="$refs.pages.fetch()"
      @url="$refs.pages.fetch()"
    />
  </section>
</template>

<script>

export default {
  props: [
    'headline',
    'layout',
    'parent',
    'page',
    'filterBy',
    'pagination',
    'sortBy',
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
