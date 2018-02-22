<template>
  <section class="kirby-fields-section">
    <kirby-form @submit="saveForm" @change="saveField" @input="resetErrors" :fields="fields" :values="values" />
  </section>
</template>

<script>
export default {
  props: {
    parent: String,
    name: String
  },
  data() {
    return {
      errors: [],
      fields: [],
      isLoading: true,
      values: {}
    };
  },
  created: function() {
    this.fetch();
    this.$events.$on("key.save", this.saveForm);
  },
  destroyed: function() {
    this.$events.$off("key.save", this.saveForm);
  },
  methods: {
    fetch() {
      this.$api
        .section(this.parent, this.name)
        .then(response => {
          this.errors = response.errors;
          this.fields = response.fields;
          this.values = response.values;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    resetErrors(values, field) {
      this.fields[field].error = false;
    },
    saveField(field, value) {
      this.$api
        .patch(this.parent + "/" + this.name + "/" + field, { value: value })
        .then(response => {
          this.fields = response.fields;
          this.values = response.values;

          if (this.fields[field].error === false) {
            this.$store.dispatch("success", "Saved!");
          }
        });
    },
    saveForm() {
      this.$api
        .patch(this.parent + "/" + this.name, this.values)
        .then(response => {
          this.fields = response.fields;
          this.values = response.values;

          if (Object.keys(response.errors).length === 0) {
            this.$store.dispatch("success", "Saved!");
          }
        });
    }
  }
};
</script>

<style>
.kirby-fields-section input[type="submit"] {
  display: none;
}
</style>
