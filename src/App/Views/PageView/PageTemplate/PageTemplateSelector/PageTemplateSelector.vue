<template>
  <kirby-collection layout="cards" @click="select" :items="blueprints" class="kirby-page-template-selector"></kirby-collection>
</template>

<script>

export default {
  data () {
    return {
      blueprint: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    select (item) {
      this.$emit('select', item)
    },
    fetch () {
      this.blueprints = [
        {
          id:   'default',
          text: 'Default',
          info: 'Just a text block',
          image: {
            url: 'https://unsplash.it/600/400/?random'
          }
        },
        {
          id:   'article',
          text: 'Article',
          info: 'A blog article',
          image: {
            url: 'https://unsplash.it/600/400/?random'
          }
        },
        {
          id:   'project',
          text: 'Project',
          info: 'A portfolio Project',
          image: {
            url: 'https://unsplash.it/600/400/?random'
          }
        }
      ]
    }
  }
}

</script>

<style>
  .kirby-page-template-selector .kirby-card {
    cursor: pointer;
  }
</style>
