<template>
  <section class="kirby-fields-section">
    <kirby-form @submit="save" :fields="fields" :values="data" />
  </section>
</template>

<script>

export default {
  props: [
    'fields',
    'values',
    'page'
  ],
  data() {
    var data = this.page.content;

    if (!data || data.length === 0) {
      data = {};
    }

    return {
      data:  data
    }
  },
  created: function () {
    this.$events.$on('key.save', this.save);
  },
  destroyed: function () {
    this.$events.$off('key.save', this.save);
  },
  methods: {
    save () {
      this.$api.page.update(this.page.id, this.data).then(() => {
        this.$store.dispatch('success', 'Saved!');
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    }
  },
  /*
  created() {
    this.interval = window.setInterval(() => {
      this.save();
    }, 10000);
  },
  destroyed() {
    window.clearInterval(this.interval);
  }*/
};

</script>

<style>

.kirby-fields-section input[type="submit"] {
  display: none;
}

</style>
