<template>
  <i v-if="alt" :class="className" :aria-label="alt" role="img" v-html="svg"></i>
  <i v-else :class="className" aria-hidden="true" v-html="svg"></i>
</template>

<script>

export default {
  props: ['type', 'alt'],
  data () {
    return {
      svg: ''
    };
  },
  computed: {
    className () {
      return 'kirby-icon'
    }
  },
  created () {

    // Get icon from window.icons, if cached
    if (this.cache()) {
      this.svg = this.cache();
      return;
    }

    fetch(window.panel.config.assets + '/icons/' + this.type + '.svg').then((response) => {

      if(response.ok) {
        return response.text();
      }

      throw new Error('Network response was not ok.');

    }).then((result) => {
      this.svg = result;
      this.cache(result);
    }).catch(() => {
      console.log('The icon could not be loaded');
    });

  },
  methods: {
    cache (svg) {

      // initialize global cache
      if (window.icons === undefined) {
        window.icons = [];
      }

      // add to cache
      if (svg) {
        return window.icons[this.type] = svg;
      }

      // get from cache
      if (window.icons[this.type]) {
        return window.icons[this.type];
      }

      return false;
    }
  }
}

</script>

<style lang="scss">

.kirby-icon {
  position: relative;
  top: -1px;
  line-height: 0;
}

.kirby-icon svg * {
  fill: $color-dark;
}

</style>
