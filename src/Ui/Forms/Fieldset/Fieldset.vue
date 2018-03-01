<template>
  <kirby-grid class="kirby-fieldset" gutter="medium">
    <kirby-column v-for="(field, index) in fields" :key="index" :width="field.width || '1/1'">

      <component v-if="exists(field.type)" :is="'kirby-' + field.type + '-field'" v-bind="field" :value="values[field.name]" @change="$emit('change', field.name, $event)" @submit="$emit('submit')" @input="input(field.name, $event)" />

      <kirby-field v-else v-bind="field">
        <kirby-box>
          The field type: <strong>{{ field.type }}</strong> does not exist
        </kirby-box>
      </kirby-field>

    </kirby-column>
  </kirby-grid>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    fields: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    values: {
      type: [Array, Object],
      default() {
        return {};
      }
    }
  },
  computed: {
    data() {
      return this.values;
    }
  },
  methods: {
    input(field, value) {
      this.data[field] = value;
      this.$emit("input", this.data, field);
    },
    exists(type) {
      return Vue.options.components["kirby-" + type + "-field"];
    }
  }
};
</script>
