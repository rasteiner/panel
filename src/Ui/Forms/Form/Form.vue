<template>
  <form ref="form" class="kirby-form" method="POST" @submit.prevent="$emit('submit')" autocomplete="off">
    <kirby-fieldset :fields="fields" :values="data" @input="input" @change="change" />
    <input ref="submitter" type="submit">
  </form>
</template>

<script>
export default {
  props: {
    fields: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    values: {
      type: [Object, Array],
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
    submit() {
      this.$refs.submitter.click();
    },
    change(name, value) {
      this.$emit("change", name, value);
    },
    input(values, field) {
      this.$emit("input", this.data, field);
    }
  }
};
</script>

<style>
.kirby-form input[type="submit"] {
  display: none;
}
</style>
