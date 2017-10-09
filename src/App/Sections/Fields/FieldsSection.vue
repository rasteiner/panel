<template>
  <section class="kirby-fields-section">
    <form @submit.prevent="save">
      <kirby-fieldset :fields="fields" :values="data" @submit="save" />
      <input type="submit">
    </form>
  </section>
</template>

<script>

import Page from 'App/Api/Page.js';

const Shortcuts = function (e) {
  if (e.metaKey || e.ctrlKey) {
    if (e.code === 'KeyS') {
      e.preventDefault();
      this.save();
    }
  }
}

export default {
  props: [
    'fields',
    'values',
    'page'
  ],
  data() {
    return {
      data: this.page.content
    }
  },
  created: function () {
    window.addEventListener('keydown', Shortcuts.bind(this), false)
  },
  destroyed: function () {
    window.removeEventListener('keydown', Shortcuts, false)
  },
  methods: {
    save () {
      Page.update(this.page.id, this.data).then(() => {
        this.$store.dispatch('success', 'Saved!');
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
