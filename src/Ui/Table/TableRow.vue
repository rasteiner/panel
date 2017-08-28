<template>
  <tr class="kirby-table-row">
    <slot />
  </tr>
</template>

<style lang="scss">

.kirby-table-row .kirby-table-cell:first-child {
  border-top-left-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  border-left: 0;
}

.kirby-table-row .kirby-table-cell[data-type="image"]:last-child,
.kirby-table-row .kirby-table-cell[data-type="image"]:first-child {
  overflow: hidden;
}

.kirby-table-row .kirby-table-cell:last-child {
  border-top-right-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}

</style>
