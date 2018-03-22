<template>
  <section class="kirby-fields-section">
    <kirby-box state="empty" v-if="issue">{{ issue.message }}</kirby-box>
    <kirby-form v-else @submit="saveForm" @change="saveField" @input="resetErrors" :fields="fields" :values="values" />
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
      values: {},
      issue: null
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
          this.values = Object.assign(
            {},
            response.values,
            this.getCache() || {}
          );
          this.isLoading = false;
        })
        .catch(error => {
          this.issue = error;
          this.isLoading = false;
        });
    },
    resetErrors(values, field) {
      this.fields[field].error = false;
    },
    id() {
      return this.parent + "/" + this.name;
    },
    hasCache() {
      return this.getCache() !== null;
    },
    getCache() {
      let values = localStorage.getItem(this.id());
      return values && JSON.parse(values);
    },
    setCache(values) {
      localStorage.setItem(this.id(), JSON.stringify(values));
    },
    setCacheField(field, value) {
      let values = this.getCache() || {};
      values[field] = value;
      this.setCache(values);
    },
    removeCache() {
      localeStorage.removeItem(this.id());
    },
    saveField(field, value) {
      this.setCacheField(field, value);
      return;

      this.$api
        .patch(this.id() + "/" + field, { value: value })
        .then(response => {
          this.fields = response.fields;
          this.values = response.values;

          if (this.fields[field].error === false) {
            // this.$store.dispatch("success", "Saved!");
          }
        });
    },
    saveForm() {
      this.setCache(this.values);

      return;
      this.$api.patch(this.id(), this.values).then(response => {
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
