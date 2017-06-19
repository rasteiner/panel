<template>
  <div class="kirby-tags-input"> 
    <kirby-tag v-for="tag in tags" 
      :ref="tag"
      :key="tag" 
      @blur.native="select(null)" 
      @focus.native="select(tag)" 
      @keydown.native.left="navigate('prev')" 
      @keydown.native.right="navigate('next')" 
      @remove="remove(tag)" 
      :removable="true"> 
        {{ tag }} 
    </kirby-tag> 
    <span class="kirby-tags-input-element"> 
      <kirby-autocomplete v-if="autocomplete" 
        ref="input" 
        :id="id"
        :map="autocomplete.map" 
        :url="autocomplete.url" 
        :ignore="this.tags" 
        @keydown.native.left="leaveInput" 
        @keydown.native.delete="leaveInput" 
        @enter="function(value) { add(value) }" 
        @select="function(item) { add(item.value) }">
      </kirby-autocomplete> 
      <input v-else :id="id" ref="input" 
        @keydown.enter="add($event.target.value)" 
        @keydown.left="leaveInput" 
        @keydown.delete="leaveInput"> 
    </span> 
  </div>
</template>

<script>

import Autocomplete from '../../Autocomplete/Autocomplete.vue';
import Tag from '../../../Buttons/Tag/Tag.vue';

export default {
  components: {
    'kirby-autocomplete': Autocomplete,
    'kirby-tag': Tag
  },
  props: ['id', 'value', 'required', 'autofocus', 'autocomplete'],
  data: function() {
    
    var tags = this.value || [];

    if(typeof tags === 'string') {
      var tags = tags.split(',').map(function(tag) {
        return tag.trim();
      });
    }

    return {
      selected: null,
      tags: tags
    }
  
  },
  methods: {
    focus: function() {
      this.$refs.input.focus();
    },
    select: function(tag) {
      this.selected = tag;          
    },
    remove: function(tag) {

      var prev = this.get('prev');
      var next = this.get('next');

      this.tags.splice(this.index(tag), 1);

      if(prev) {
        prev.ref.focus();
      } else if(next) {
        this.$nextTick(function() {
          var nextIndex  = this.tags.indexOf(next.tag);
          var nextResult = this.get(nextIndex);
          this.selected = nextResult.tag;
          nextResult.ref.focus();                  
        }.bind(this));
      } else {
        this.$refs.input.focus();
      }

    },
    index: function(tag) {
      return this.tags.indexOf(tag);
    },
    add: function(tag) {      

      var tag = tag.trim();

      if(tag.length === 0) {
        return;
      }

      if(this.index(tag) === -1) {
        this.tags.push(tag);        
      }

      if(this.autocomplete) {
        this.$refs.input.close();
        this.$refs.input.clear();
      } else {
        this.$refs.input.value = '';        
      }

    },
    get: function(method) {

      switch(method) {
        case 'prev':
        case 'next':
          if(!this.selected) return;
          var currIndex = this.index(this.selected);
          var nextIndex = method === 'prev' ? (currIndex - 1) : (currIndex + 1);
          break;
        case 'first':
          var nextIndex = 0;
        case 'last':
          var nextIndex = (this.tags.length - 1);
          break;
        default: 
          var nextIndex = method;
      }

      var nextTag = this.tags[nextIndex];
      var nextRef = this.$refs[nextTag];

      if(nextRef && nextRef[0]) {
        return {
          ref: nextRef[0],
          tag: nextTag,
          index: nextIndex
        }
      } else {
        return false;
      }

    },
    navigate: function(method) {

      var result = this.get(method);

      if(result) {
        result.ref.focus();
        this.selected = result.tag;
      } else if(method === 'next') {
        this.$refs.input.focus();
        this.selected = null;
      }

    },
    leaveInput: function(e) {

      var position = e.target.selectionStart;

      if(position === 0) {
        this.navigate('last');
        e.target.blur();
      }

    }
  }
}

</script>

<style>

.kirby-tags-input {
  display: flex;
  flex-wrap: wrap;
  padding: 4px 0 0 4px;
  align-items: baseline;
}
.kirby-tags-input .kirby-tag {
  margin-right: 4px;
  margin-bottom: 4px;
}
.kirby-tags-input-element input {
  display: inline-block;
  min-width: 4rem;
  padding: .4rem;
  flex-grow: 1;
  font: inherit;
  border: 0;
  outline: 0;
  line-height: 1;
  outline: 0;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 3px;
}

</style>
