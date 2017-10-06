<template>
  <kirby-cards>
    <kirby-card v-for="item in items" :key="item.id" v-bind="item"
      menu-label="Options"
      @action="$emit('action', item, $event)"
      @click.native="$emit('click', item)" />
  </kirby-cards>
</template>

<script>

export default {
  props: ['items']
};

</script>
