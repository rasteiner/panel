<template>
  <kirby-grid class="kirby-fieldset" gutter="medium">
    <kirby-column v-for="(field, index) in fields" :key="index" :width="field.width || '1/1'">
      <component :is="'kirby-' + field.type + '-field'" v-bind="field" :value="values[field.name]" @input="input(field.name, $event)" />
    </kirby-column>
  </kirby-grid>
</template>

<script>

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
  data () {
    return {
      data: this.values
    }
  },
  methods: {
    input (field, value) {
      this.data[field] = value;
      this.$emit('input', this.data);
    }
  }
}

</script>

<style>

.kirby-fieldset {
  margin-bottom: -1.5rem;
}

</style>
