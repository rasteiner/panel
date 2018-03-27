<template>
  <draggable element="kirby-cards" :list="cards" @end="$emit('sort', cards)" :options="{disabled: !sortable, forceFallback: true}">
    <kirby-card v-for="item in items" :key="item.id" v-bind="item"
      menu-label="Options"
      @action="$emit('action', item, $event)"
      @click.native="$emit('click', item)" />
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: {
    items: [Array, Object],
    sortable: Boolean
  },
  data() {
    return {
      cards: this.items
    };
  },
  components: {
    draggable
  }
};
</script>

<style lang="scss">
.kirby-cards .sortable-ghost {
  background: $color-inset;
  box-shadow: $box-shadow-inset, $color-border 0 0 0 1px;
}
.kirby-cards .sortable-ghost * {
  display: none;
}
</style>
