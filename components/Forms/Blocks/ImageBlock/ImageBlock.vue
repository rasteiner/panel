<template>
  <kirby-block class="kirby-image-block" 
    @append="append"
    @remove="remove">

    <figure v-if="value.src">
      <img :src="value.src">
      <figcaption>
        <kirby-fancy-input 
          ref="input"
          @enter="enter" 
          @input="caption" 
          @empty="empty" 
          :placeholder="placeholder"
          :multiline="false"
          :value="value.caption || ''" />
      </figcaption>
    </figure>

    <kirby-box v-else>
      <kirby-button icon="cloud-upload" :upload="{accept: 'image/*'}">Upload an image</kirby-button>
    </kirby-box>

  </kirby-block>
</template>

<script>

import FancyInput from '../../Inputs/FancyInput/FancyInput.vue';
import Box from '../../../Layout/Box/Box.vue';
import Button from '../../../Buttons/Button/Button.vue';
import Block from '../Block.vue';

export default {
  components: {
    'kirby-fancy-input': FancyInput,
    'kirby-block': Block,
    'kirby-box': Box,
    'kirby-button': Button
  },
  props: {
    value: {
      type: [String,Object]
    },
    placeholder: {
      type: String,
      default: 'Type something'
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    caption(caption) {
      this.value.caption = caption;
      this.$emit('input', this.value);
    },
    enter() {
      if (this.multiline === false) {
        this.$emit('append', 'text');        
      }
    },
    append(type) {
      this.$emit('append', type);
    },
    remove() {
      this.$emit('remove');
    },
    empty() {
      this.$emit('remove');
    }
  }
}

</script>

<style lang="scss">

.kirby-image-block {
  margin-bottom: 1.5rem;
}
.kirby-image-block img {
  width: 100%;
}
.kirby-image-block figcaption {
  color: $color-dark-grey;
}

</style>  