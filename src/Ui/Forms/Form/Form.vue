<template>
  <form ref="form" class="kirby-form" method="POST" @submit.prevent="$emit('submit')" autocomplete="off">
    <kirby-fieldset :fields="fields" :values="data" @input="input" />
    <input ref="submitter" type="submit">
  </form>
</template>

<script>

export default {
  props: {
    fields: {
      type: Array,
      default () {
        return [];
      }
    },
    values: {
      type: Object,
      default () {
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
    submit () {
      this.$refs.submitter.click();
    },
    input () {
      this.$emit('input', this.data);
    }
  }
}

</script>

<style>

.kirby-form input[type="submit"] {
  display: none;
}

</style>
