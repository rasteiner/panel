<template>
  <kirby-block class="kirby-ul-block" 
    @append="append"
    @remove="remove">

    <ul>
      <li v-for="(item, index) in items" :key="item._id">
        <kirby-fancy-input 
          ref="item"
          placeholder="Type something …"
          @enter="enter(index)" 
          @input="input(index)" 
          @empty="empty(index)" 
          :value="item.text" />        
      </li>
    </ul>

  </kirby-block>
</template>

<script>

import FancyInput from '../../Inputs/FancyInput/FancyInput.vue';
import Block from '../Block.vue';

const guid = function() {
  return Math.random().toString(36).substr(2, 10);
};

export default {
  components: {
    'kirby-fancy-input': FancyInput,
    'kirby-block': Block
  },
  props: {
    value: {
      type: [String,Array]
    }
  },
  data() {

    let items = this.value || [{
      _id: guid(),
      text: ''
    }];

    return {
      items: items.map(function(item) {
        item._id = guid();
        return item;
      })
    }
  },
  methods: {
    focus() {
      this.$refs.item[0].focus();
    },
    enter(index) {
      this.items.splice(index + 1, 0, {
        _id: guid(),
        text: ''
      });

      this.$nextTick(function() {
        this.select(index + 1);
      }.bind(this));

    },
    select(index) {
      try {
        this.$refs.item[index].focus();        
      } catch(e) {

      }
    },
    empty(index) {

      if (this.items.length > 1) {
        this.items.splice(index, 1);
        this.$nextTick(function() {
          this.select(index - 1);
        }.bind(this));        
      } else {
        this.remove();
      }

    },
    input() {

    },
    append(type) {
      this.$emit('append', type);
    },
    remove() {
      this.$emit('remove');
    }
  }
}

</script>

<style lang="scss">

.kirby-ul-block {
  margin-bottom: 1.5rem;
}
.kirby-ul-block ul {
  margin-left: 1rem;
}
.kirby-ul-block li {
  list-style: disc;
}

</style>  