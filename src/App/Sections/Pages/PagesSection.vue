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
    'model',
    'filterBy',
    'pagination',
    'sortBy',
    'template',
    'limit'
  ],
  computed: {
    query () {
      return {
        parent: this.parent || this.model.id,
        filterBy: this.filter,
        sortBy: this.sortBy,
        limit: this.limit
      }
    },
    filter () {

      const filter = this.filterBy || [];

      // filter by template
      if (this.template) {

        const operator = typeof this.template === 'object' ? 'in' : '==';

        filter.push({
          field: 'template',
          operator: operator,
          value: this.template
        });

      }

      return filter;

    }
  }
};

</script>
