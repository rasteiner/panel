<template>
  <th class="kirby-table-cell kirby-table-header-cell"
    :scope="scope === 'row' ? 'row' : 'col'"
    :data-type="type"
    :data-width="width"
    :data-align="align">
    <slot />
  </th>
</template>

<script>

export default {
  props: ['scope', 'type', 'width', 'align']
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