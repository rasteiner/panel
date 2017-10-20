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

    if (this.$store.state.icons[this.type]) {
      return this.$store.state.icons[this.type];
    }

    fetch(window.panel.config.assets + '/icons/' + this.type + '.svg').then((response) => {

      if(response.ok) {
        return response.text();
      }

      throw new Error('Network response was not ok.');

    }).then((result) => {
      this.svg = result;
      this.$store.dispatch('icon', {
        type: this.type,
        svg:  result
      });
    }).catch(() => {
      console.log('The icon could not be loaded');
    });

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
