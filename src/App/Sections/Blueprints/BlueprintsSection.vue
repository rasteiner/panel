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
      items: []
    }
  },
  computed: {
    parent () {
      if (this.in) {
        return this.in.id
      }
      return this.for.parent;
    }
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

      // TODO: Switch to real blueprints from API
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

      var items = [
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

      Blueprint.get(this.parent).then((blueprint) => {
        // filter current blueprint from list
        if (this.for) {
          items = items.filter((item) => item.id !== this.for.template);
        }

        // Filter templates not allowed in parent blueprint
        if (blueprint.pages && blueprint.pages.template) {
          items = items.filter((item) => blueprint.pages.template.indexOf(item.id) !== -1);
        }

        // Emit feedback for parent compnents
        if (items.length === 1) {
          this.$emit('single', items[0]);
        } else if (!items ||items.length === 0) {
          this.$emit('none');
        }

        this.items = items;
      });

    }
  }
};

</script>

<style lang="scss">

.kirby-blueprints-section .kirby-card {
  cursor: pointer;
}

</style>

