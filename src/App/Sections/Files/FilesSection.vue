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
    'filter',
    'pagination',
    'sort'
  ],
  computed: {
    query () {
      return {
        parent: this.parent,
        filter: this.filter,
        sort: this.sort
      }
    }
  }
};

</script>
