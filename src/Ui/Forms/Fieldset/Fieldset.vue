<template>
  <kirby-grid class="kirby-fieldset" gutter="medium">
    <kirby-column v-for="(field, index) in fields" :key="index" :width="field.width || '1/1'">
      <component v-if="exists(field.type)" :is="'kirby-' + field.type + '-field'" v-bind="field" :value="values[field.name]" @submit="$emit('submit')" @input="input(field.name, $event)" />

      <kirby-box v-else>Invalid field type: {{ field.type }}</kirby-box>
    </kirby-column>
  </kirby-grid>
</template>

<script>

import Vue from 'vue';

export default {
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      }
    },
    values: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    data() {
      return this.values
    }
  },
  methods: {
    input (field, value) {
      this.data[field] = value;
      this.$emit('input', this.data);
    },
    exists (type) {
      return Vue.options.components['kirby-' + type + '-field'];
    }
  }
}

</script>
