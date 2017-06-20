<template>
  <kirby-button-group>
    <kirby-button :disabled="!hasPrev" icon="angle-left"></kirby-button>
    <kirby-button :disabled="!hasPages" v-if="details">{{ start }}-{{ end }} / {{ total }}</kirby-button>
    <kirby-button :disabled="!hasNext" icon="angle-right"></kirby-button>
  </kirby-button-group>
</template>

<script>

import Button from '../../Buttons/Button/Button.vue'
import ButtonGroup from '../../Buttons/ButtonGroup/ButtonGroup.vue'

export default {
  components: {
    'kirby-button': Button,
    'kirby-button-group': ButtonGroup
  },
  computed: {
    start() {
      return (this.page - 1) * this.limit + 1;
    },
    end() {
      
      let value = (this.start - 1) + this.limit;

      if (value > this.total) {
        return this.total;
      } else {
        return value;
      }

    },
    hasPrev() {
      return this.start > 1;
    },
    hasNext() {
      return this.end < this.total;
    },
    hasPages() {
      return this.total > this.limit;
    }
  },
  props: {
    details: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    }
  }
}

</script>
