<template>
  <td class="kirby-table-cell"
    :data-type="type"
    :data-state="state"
    :data-width="width"
    :data-align="align">
    <span><slot /></span>
  </td>
</template>

<script>

export default {
  props: ['type', 'state', 'width', 'align']
}

</script>

<style lang="scss">

.kirby-table-cell {
  padding: .5rem 1rem;
  line-height: 1.5em;
  background: $color-white;
  font-family: $font-family-mono;
  font-size: $font-size-small;
}

/* types */
.kirby-table-cell[data-type="image"] {
  padding: 0;
  line-height: 0;
  width: 2.5rem;
  height: 2.5rem;
}

.kirby-table-cell[data-type="image"] + .kirby-table-cell {
  [dir="ltr"] & {
    border-left: 0;
  }
  [dir="rtl"] & {
    border-right: 0;
  }
}

.kirby-table-cell[data-type="image"] .kirby-image {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  background: $color-dark;
}

.kirby-table-cell[data-type="image"] .kirby-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-dark;
  width: 2.5rem;
  height: 2.5rem;
}
.kirby-table-cell[data-type="image"] .kirby-icon svg * {
  fill: rgba($color-white, .5);
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
.kirby-table-cell[data-type="link"] a[data-tabbed] {
  position: relative;
  @include focus-ring;
  z-index: 1;
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
  width: 0.00001%;
  white-space: nowrap;

  [dir="ltr"] & {
    text-align: right;
  }
  [dir="rtl"] & {
    text-align: left;
  }
}

.kirby-table-cell[data-type="info"] {
  color: $color-light-grey;
}

/* states */
.kirby-table-cell[data-state="positive"] {
  background: $color-positive;
}

.kirby-table-cell[data-state="negative"] {
  background: $color-negative;
}

.kirby-table-cell[data-state="notice"] {
  background: $color-notice;
}

.kirby-table-cell[data-state="faded"] {
  opacity: .25;
}

/* alignments */
.kirby-table-cell[data-align="left"] {
  [dir="ltr"] & {
    text-align: left;
  }
  [dir="rtl"] & {
    text-align: right;
  }
}

.kirby-table-cell[data-align="center"] {
  text-align: center;
}

.kirby-table-cell[data-align="right"] {
  [dir="ltr"] & {
    text-align: right;
  }
  [dir="rtl"] & {
    text-align: left;
  }
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
