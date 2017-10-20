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

import Page from 'App/Api/Page.js';
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

      Page.blueprints(this.parent).then((blueprints) => {

        // Emit feedback for parent compnents
        if (blueprints.length === 1) {
          this.$emit('single', blueprints[0]);
        } else if (!blueprints ||blueprints.length === 0) {
          this.$emit('none');
        }

        // Prepare for card collection
        this.items = blueprints.map((item) => {
          return {
            id:   item.name,
            text: item.title || item.name,
            info: item.description || '',
            image: {
              url: this.image(item.name)
            }
          }
        });

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

