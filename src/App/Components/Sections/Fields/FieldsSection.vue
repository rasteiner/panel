<template>
  <section class="kirby-fields-section">
    <kirby-form @submit="submit" :fields="fields" :values="values" />
  </section>
</template>

<script>

export default {
  props: {
    parent: String,
    name: String,
  },
  data() {
    return {
      errors: [],
      fields: [],
      isLoading: true,
      values: {},
    }
  },
  created: function () {
    this.fetch();
    this.$events.$on('key.save', this.submit);
  },
  destroyed: function () {
    this.$events.$off('key.save', this.submit);
  },
  methods: {
    fetch () {

      this.$api.section(this.parent, this.name).then((response) => {
        this.errors = response.errors;
        this.fields = response.fields;
        this.values = response.values;
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
      });

    },
    submit () {
      this.$emit('submit', this.values);
    }
  }
};

</script>

<style>

.kirby-fields-section input[type="submit"] {
  display: none;
}

</style>
