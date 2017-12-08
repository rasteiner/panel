<template>
  <i v-if="alt" class="kirby-icon" :aria-label="alt" role="img" v-html="svg"></i>
  <i v-else class="kirby-icon" aria-hidden="true" v-html="svg"></i>
</template>

<script>

export default {
  props: {
    alt: {
      type: String
    },
    source: {
      type: String
    }
  },
  data () {
    return {
      svg: ''
    };
  },
  created () {
    this.fetch();
  },
  watch: {
    type () {
      this.fetch();
    }
  },
  methods: {
    fetch () {
      // Get icon from window.icons, if cached
      if (this.cache()) {
        this.svg = this.cache();
        return;
      }

      fetch(this.source).then((response) => {

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
    cache (svg) {

      // initialize global cache
      if (window.icons === undefined) {
        window.icons = [];
      }

      // add to cache
      if (svg) {
        return window.icons[this.source] = svg;
      }

      // get from cache
      if (window.icons[this.source]) {
        return window.icons[this.source];
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
