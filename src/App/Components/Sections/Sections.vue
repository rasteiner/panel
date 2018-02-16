<template>
  <kirby-grid class="kirby-sections" gutter="large">
    <kirby-column v-for="(column, columnIndex) in columns" :key="parent + '-column-' + columnIndex" :width="column.width">
      <template v-for="(section, sectionIndex) in column.sections">
        <component v-if="exists(section.type)"
          :key="parent + '-column-' + columnIndex + '-section-' + sectionIndex"
          :is="'kirby-' + section.type + '-section'"
          :parent="parent"
          :name="section.name"
          @submit="$emit('submit', $event)" />
        <template v-else>
          <kirby-box>
            The section type <strong>{{ section.type }}</strong> does not exist. Please change the configuration in your blueprint.
          </kirby-box>
        </template>
      </template>
    </kirby-column>
  </kirby-grid>
</template>

<script>

import Vue from 'vue';

export default {
  props: {
    parent: String,
    columns: Array
  },
  methods: {
    exists (type) {
      return Vue.options.components['kirby-' + type + '-section'];
    }
  }
};

</script>
