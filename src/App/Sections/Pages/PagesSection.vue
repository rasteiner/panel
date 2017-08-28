<template>
  <section>
    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <kirby-button icon="add" @click="$refs.create.open()">Add</kirby-button>
      </kirby-button-group>
    </kirby-headline>
    <kirby-data
      :layout="layout"
      :items="items"
      :pagination="pagination"
      @paginate="paginate"
      @action="action"
      />
    <kirby-page-create-dialog ref="create"></kirby-page-create-dialog>
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
