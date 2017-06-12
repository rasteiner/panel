<template>
  <kirby-table-cell class="kirby-table-header-cell" :type="type" :width="width" :align="align">
    <slot />
  </kirby-table-cell>
</template>

<script>

import TableCell from './TableCell.vue';

export default {
  components: {
    'kirby-table-cell': TableCell
  },
  props: ['type', 'width', 'align']
}

</script>

<style lang="scss">

.kirby-table-header-cell.kirby-table-cell {
  text-align: left;
  font-weight: 600;
  background: none;
  border: 0;
}

</style>