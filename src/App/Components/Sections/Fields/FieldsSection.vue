<template>
  <section class="kirby-fields-section">
    <kirby-form @submit="submit" :fields="fields" :values="formData" />
  </section>
</template>

<script>

export default {
  props: [
    'config',
    'values',
    'model'
  ],
  data() {
    return {
      formData: this.values,
      fields:   this.config.fields
    }
  },
  created: function () {
    this.$events.$on('key.save', this.submit);
  },
  destroyed: function () {
    this.$events.$off('key.save', this.submit);
  },
  methods: {
    submit () {
      this.$emit('submit', this.formData);
    }
  }
};

</script>

<style>

.kirby-fields-section input[type="submit"] {
  display: none;
}

</style>