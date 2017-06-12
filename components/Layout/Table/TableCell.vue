<template>
  <td class="kirby-table-cell" :data-type="type" :data-width="width" :data-align="align">
    <slot />       
  </td>
</template>

<script>

export default {
  props: ['type', 'width', 'align']
}

</script>

<style lang="scss">

.kirby-table-cell {
  padding: .5rem 1rem;
  line-height: 1.5em;
  background: $color-white;
  border-bottom: 2px solid $color-background;  
  border-left: 1px dashed $color-border;
}

.kirby-table-cell > .link {
  border-bottom: 2px solid currentColor;
}

/* types */
.kirby-table-cell[data-type="image"] {
  padding: 0;
  line-height: 0;
  width: 2.5rem;
  height: 2.5rem;
}

.kirby-table-cell[data-type="image"] + .kirby-table-cell {
  border-left: 0;
}

.kirby-table-cell[data-type="image"] .kirby-image {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  background: $color-dark;
}

.kirby-table-cell[data-type="link"] {
  padding: 0;  
}

.kirby-table-cell[data-type="link"] a {
  padding: .5rem 1rem;  
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.kirby-table-cell[data-type="icon"] {
  width: 2.5rem;
}

.kirby-table-cell[data-type="button"] {
  text-align: center;
  width: 1%;
  white-space: nowrap;
  padding: 0;
}

.kirby-table-cell[data-type="button"] > .kirby-button,
.kirby-table-cell[data-type="button"] > .kirby-dropdown > .kirby-button {
  padding: .5rem 1rem;
}

.kirby-table-cell[data-type="number"] {
  text-align: right;
  width: 0.00001%;
  white-space: nowrap;
}

.kirby-table-cell[data-type="info"] {
  color: $color-light-grey;
}

/* alignments */
.kirby-table-cell[data-align="left"] {
  text-align: left;
}

.kirby-table-cell[data-align="center"] {
  text-align: center;
}

.kirby-table-cell[data-align="right"] {
  text-align: right;
}

/* widths */
.kirby-table-cell[data-width="auto"] {
  width: 0.0001%;
  white-space: nowrap;
}

.kirby-table-cell[data-width="1/2"] {
  width: 50%;
}

.kirby-table-cell[data-width="1/3"] {
  width: 33.33%;
}

.kirby-table-cell[data-width="2/3"] {
  width: 66.66%;
}

.kirby-table-cell[data-width="1/4"] {
  width: 25%;
}

.kirby-table-cell[data-width="3/4"] {
  width: 75%;
}

</style>