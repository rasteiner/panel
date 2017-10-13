<template>
  <section class="kirby-blueprints-section">
    <kirby-collection
      layout="cards"
      :items="items"
      @click="$emit('select', $event)">
    </kirby-collection>
  </section>
</template>

<script>

import Blueprint from 'App/Api/Blueprint.js';

export default {
  props: {
    for: {
      type: Object
    },
    in: {
      type: Object
    }
  },
  data () {
    return {
      parent: this.in || this.for.parent,
      items: []
    }
  },
  created () {
    this.fetch();
  },
  watch: {
    for () {
      this.fetch();
    },
    in () {
      this.fetch();
    }
  },
  methods: {
    image (blueprint) {
      return window.panel.config.index + '/assets/blueprints/' + blueprint + '.png';
    },
    fetch () {

      // TODO: Switch to real blureprints from API
      /*
       Blueprint.list().then((blueprints) => {
        this.items = blueprints.map((id) => {
          return Blueprint.get(id).then((blueprint) => {
            return {
              id:   id,
              text: blueprint.name,
              info: blueprint.description,
              image: {
                url: this.image(id)
              }
            }
          });
        });
      });
      */

      this.items = [
        {
          id:   'default',
          text: 'Default',
          info: 'Just a text block',
          link: '#',
          image: {
            url: this.image('default')
          }
        },
        {
          id:   'article',
          text: 'Article',
          info: 'A blog article',
          link: '#',
          image: {
            url: this.image('article')
          }
        },
        {
          id:   'project',
          text: 'Project',
          info: 'A portfolio Project',
          link: '#',
          image: {
            url: this.image('project')
          }
        }
      ];


      // filter current blueprint from list
      if (this.for) {
        this.items = this.items.filter((item)  => item.id !== this.for.template);
      }

      // TODO: only show templates allowed in parent blueprint
      if (this.parent) {

      }

      if (this.items.length === 1) {
        this.$emit('single', this.items[0]);
      }

      if (!this.items || this.items.length === 0) {
        this.$emit('none');
      }

    }
  }
};

</script>

<style lang="scss">

.kirby-blueprints-section .kirby-card {
  cursor: pointer;
}

</style>

