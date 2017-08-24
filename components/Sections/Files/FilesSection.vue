<template>
  <section>
    <kirby-headline>
      <span>{{ headline }}</span>
    </kirby-headline>
    <kirby-files :layout="layout" :parent="parent" :filter="filter" :pagination="pagination" :sort="sort" />
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
  ]
};

</script>
