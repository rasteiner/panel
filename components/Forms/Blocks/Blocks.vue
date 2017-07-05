<template>
  <div class="kirby-blocks">
    <component v-for="(block, index) in blocks" 
      v-bind="block.props || {}"
      :key="block.id"
      :ref="'block-' + index"
      :is="'kirby-' + block.type + '-block'" 
      :value="block.value" 
      @input="input(index, $event)"
      @append="append(index, ...$event)"
      @remove="remove(index)" />  
  </div>
</template>

<script>

import Vue from 'vue';

import Dropdown from 'Navigation/Dropdown/Dropdown.vue';
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue';
import DropdownItem from 'Navigation/Dropdown/DropdownItem.vue';

import HeadlineBlock from './HeadlineBlock/HeadlineBlock.vue';
import SubheadlineBlock from './SubheadlineBlock/SubheadlineBlock.vue';
import TextBlock from './TextBlock/TextBlock.vue';
import QuoteBlock from './QuoteBlock/QuoteBlock.vue';
import CodeBlock from './CodeBlock/CodeBlock.vue';
import ImageBlock from './ImageBlock/ImageBlock.vue';
import ListBlock from './ListBlock/ListBlock.vue';

const guid = function() {
  return Math.random().toString(36).substr(2, 10);
};

export default {
  components: {
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem,
    'kirby-headline-block': HeadlineBlock,
    'kirby-subheadline-block': SubheadlineBlock,
    'kirby-text-block': TextBlock,
    'kirby-quote-block': QuoteBlock,
    'kirby-code-block': CodeBlock,
    'kirby-image-block': ImageBlock,
    'kirby-list-block': ListBlock
  },
  props: [
    'value'
  ],
  data() {
    return {
      blocks: this.value.map(function(item) {
        item._id = guid();
        return item;
      })
    }
  },  
  methods: {
    input(index, value) {
      this.blocks[index].value = value;
    },
    append(index, type, props) {

      console.log(props);

      this.blocks.splice(index + 1, 0, {
        id: guid(),
        type: type,
        props: props || {},
        value: ''
      });

      this.$nextTick(function() {
        this.focus(index + 1);
      }.bind(this));

    },
    remove(index) {

      this.blocks.splice(index, 1);

      this.$nextTick(function() {
        this.focus(index - 1);
      }.bind(this));

    },
    focus(index) {
      try {
        this.$refs['block-' + index][0].focus();        
      } catch(e) {
        console.log('could not focus on ' + index);
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-blocks {
  background: #fff;
  padding: 1.5rem;
}

</style>