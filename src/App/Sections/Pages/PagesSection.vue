<template>
  <section>
    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <kirby-button icon="add" @click="add">Add</kirby-button>
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
    'page',
    'filterBy',
    'pagination',
    'sort',
  ],
  methods: {
    add () {
      if (this.parentId && this.parentId !== '/') {
        this.$router.push('/pages/' + this.parentId + '/new');
      } else {
        this.$router.push('/pages/new');
      }
    }
  },
  computed: {
    parentId () {
      return this.parent || this.page.id;
    },
    query () {
      return {
        parent: this.parentId,
        filterBy: this.filterBy,
        sort: this.sort
      }
    }
  }
};

</script>
