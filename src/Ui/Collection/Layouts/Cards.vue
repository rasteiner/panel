<template>

  <div class="kirby-data-cards">

    <kirby-cards>
      <kirby-card v-for="item in items" :key="item.id" v-bind="item"
        menu-label="Options"
        @action="$emit('action', item, $event)" />
    </kirby-cards>

    <kirby-pagination
      v-if="pagination.hide !== true"
      v-bind="pagination"
      @paginate="$emit('paginate', $event)" />

  </div>

</template>

<script>

export default {
  props: ['items', 'pagination']
};

</script>
