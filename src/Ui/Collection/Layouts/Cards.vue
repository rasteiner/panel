<template>
  <draggable element="kirby-cards" :list="list" @change="$emit('change', $event)" @end="$emit('sort', list)" :options="dragOptions">
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
    group: String,
    sortable: Boolean
  },
  data() {
    return {
      list: this.items,
      dragOptions: {
        disabled: !this.sortable,
        forceFallback: true,
        group: this.group
      }
    };
  },
  watch: {
    items(items) {
      this.list = items;
    }
  },
  components: {
    draggable
  }
};
</script>

<style lang="scss">
.kirby-cards {
  min-height: 2.5rem;
}
.kirby-cards:empty {
  background: $color-inset;
  border: 1px dashed $color-border;
}
.kirby-cards .sortable-ghost {
  background: $color-inset;
  box-shadow: $box-shadow-inset, $color-border 0 0 0 1px;
}
.kirby-cards .sortable-ghost * {
  display: none;
}
</style>
