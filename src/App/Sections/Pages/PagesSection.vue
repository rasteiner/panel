<template>
  <section>
    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <kirby-button icon="add" @click="$router.push({ name: 'Page', params: { path: parent }, query: { create: true }})">Add</kirby-button>
      </kirby-button-group>
    </kirby-headline>
    <kirby-pages-collection
      ref="pages"
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
    'filter',
    'pagination',
    'sort',
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
