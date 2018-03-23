<template>
  <section class="kirby-fields-section">
    <kirby-box state="empty" v-if="issue">{{ issue.message }}</kirby-box>
    <kirby-form v-else @submit="saveForm" @input="input" :fields="fields" :values="values" />
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
      stored: {},
      values: {},
      issue: null
    };
  },
  created: function() {
    this.fetch();

    this.$events.$on("key.save", this.saveForm);
    this.$events.$on("form.reset", this.resetAndFetch);
    this.$events.$on("form.save", this.saveForm);
  },
  destroyed: function() {
    this.$events.$off("key.save", this.saveForm);
    this.$events.$off("form.reset", this.resetAndFetch);
    this.$events.$off("form.save", this.saveForm);
  },
  methods: {
    input(values, field) {
      this.$store.dispatch("changes", { key: this.parent, value: true });
      this.$events.$emit("form.changed");
      this.$cache.set(this.id(), values);
      this.resetErrors(values, field);
    },
    fetch() {
      this.$api
        .section(this.parent, this.name)
        .then(response => {
          this.errors = response.errors;
          this.fields = response.fields;
          this.stored = response.values;
          this.values = Object.assign(
            {},
            response.values,
            this.$cache.get(this.id()) || {}
          );

          if (this.$cache.exists(this.id())) {
            this.$store.dispatch("changes", { key: this.parent, value: true });
            this.$events.$emit("form.changed");
          } else {
            this.$store.dispatch("changes", { key: this.parent, value: false });
            this.$events.$emit("form.unchanged");
          }

          this.isLoading = false;
        })
        .catch(error => {
          this.issue = error;
          this.isLoading = false;
        });
    },
    reset() {
      this.$cache.remove(this.id());
      this.$store.dispatch("changes", {
        key: this.parent,
        value: false
      });
      this.$events.$emit("form.unchanged");
    },
    resetAndFetch() {
      this.reset();
      this.fetch();
    },
    resetErrors(values, field) {
      this.fields[field].error = false;
    },
    id() {
      return this.parent + "/" + this.name;
    },
    saveForm() {
      this.$api.patch(this.id(), this.values).then(response => {
        this.fields = response.fields;
        this.values = response.values;

        if (Object.keys(response.errors).length === 0) {
          this.$store.dispatch("success", "Saved!");
          this.reset();
        } else {
          this.$store.dispatch("error", "Please fix all errors");
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
