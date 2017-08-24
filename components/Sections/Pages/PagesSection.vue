<template>
  <section>
    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <kirby-button icon="add" @click="$refs.create.open()">Add</kirby-button>
      </kirby-button-group>
    </kirby-headline>
    <kirby-pages ref="pages" :layout="layout" :parent="parent" :filter="filter" :pagination="pagination" :sort="sort" />
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
    'sort'
  ]
};

</script>
