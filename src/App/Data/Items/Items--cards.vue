<template>

  <div class="kirby-data-cards">

    <kirby-cards>
      <kirby-card v-for="item in items" :key="item.id" v-bind="item"
        menu-label="Options"
        @action="$emit('action', item, $event)" />
    </kirby-cards>

    <kirby-pagination
      v-if="paginationOptions.hide !== true"
      v-bind="paginationOptions"
      @paginate="$emit('paginate', $event)" />

  </div>

</template>

<script>

import DataMixin from '../Data.mixin.js';

export default {
  mixins: [DataMixin]
};

</script>
