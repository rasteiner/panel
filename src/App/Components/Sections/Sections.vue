<template>
  <kirby-grid class="kirby-sections" gutter="large">
    <kirby-column v-for="(column, columnIndex) in layout" :key="'column-' + columnIndex" :width="column.width">
      <template v-for="(section, sectionIndex) in column.sections">
        <component v-if="exists(section.type)"
          :key="model.id + '-column-' + columnIndex + '-section-' + sectionIndex"
          :values="values"
          :is="'kirby-' + section.type + '-section'"
          :self="self"
          :model="model"
          @submit="$emit('submit', $event)"
          :config="section" />
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
    model: Object,
    values: Object,
    layout: Array,
    self: String
  },
  methods: {
    exists (type) {
      return Vue.options.components['kirby-' + type + '-section'];
    }
  }
};

</script>
