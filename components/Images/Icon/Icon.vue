<template>
  <i v-if="alt" :class="className" :aria-label="alt" role="img" v-html="svg"></i>
  <i v-else :class="className" aria-hidden="true" v-html="svg"></i>
</template>

<script>

export default {
  props: ['type', 'alt'],
  data() {
    return {
      svg: ''
    };
  },
  computed: {
    className: function() {
      return 'kirby-icon'
    }
  },
  created() {

    fetch('/icons/' + this.type + '.svg').then(function(response) {
      if(response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok.');
      }
    }).then(function(result) {
      this.svg = result;
    }.bind(this)).catch(function () {
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

</style>
