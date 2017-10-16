<template>
  <kirby-field class="kirby-tags-field" v-bind="$props" @click.native="focus">
    <draggable v-model="data" :options="{disabled: !sortable}" class="kirby-tags-input">
      <kirby-tag v-for="tag in data"
        :ref="tag"
        :key="tag"
        @blur.native="select(null)"
        @focus.native="select(tag)"
        @keydown.native.left="navigate('prev')"
        @keydown.native.right="navigate('next')"
        @dblclick.native="edit(tag)"
        @remove="remove(tag)"
        :removable="true">
          {{ tag }}
      </kirby-tag>
      <span slot="footer" class="kirby-tags-input-element">
        <kirby-autocomplete v-if="autocomplete"
          ref="input"
          :id="_uid"
          :map="autocomplete.map"
          :url="autocomplete.url"
          :ignore="data"
          @keydown.native.left="leaveInput"
          @keydown.native.delete="leaveInput"
          @enter="function(value) { add(value) }"
          @select="function(item) { add(item.value) }">
        </kirby-autocomplete>
        <input v-else :id="_uid" ref="input"
          @keydown.enter="add($event.target.value)"
          @keydown.left="leaveInput"
          @keydown.delete="leaveInput">
      </span>
    </draggable>
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';
import draggable from 'vuedraggable'

export default {
  mixins: [Field],
  components: {
    draggable
  },
  props: {
    label: {
      default: 'Tags'
    },
    name: {
      default: 'tags'
    },
    icon: {
      default: 'tag'
    },
    separator: {
      type: String,
      default: ','
    },
    autocomplete: {
      type: [Boolean, Object],
      default: false
    },
    sortable: {
      type: Boolean,
      default: true
    }
  },
  data: function() {

    var tags = this.value || [];

    if(typeof tags === 'string') {
      var tags = tags.split(this.separator).map(tag => tag.trim());
    }

    return {
      data: tags,
      selected: null
    }

  },
  methods: {
    focus () {
      this.$refs.input.focus();
    },
    select (tag) {
      this.selected = tag;
    },
    index (tag) {
      return this.data.indexOf(tag);
    },
    add (tag) {

      var tag = tag.trim();

      if(tag.length === 0) {
        return;
      }

      if(this.index(tag) === -1) {
        this.data.push(tag);
      }

      if(this.autocomplete) {
        this.$refs.input.close();
        this.$refs.input.clear();
      } else {
        this.$refs.input.value = '';
      }
    },
    edit (tag) {
      this.$refs.input.value = tag;
      this.$refs.input.select();
      this.remove(tag);
    },
    remove (tag) {
      var prev = this.get('prev');
      var next = this.get('next');

      this.data.splice(this.index(tag), 1);

      if(prev) {
        prev.ref.focus();
      } else if(next) {
        this.$nextTick(() => {
          var nextIndex  = this.data.indexOf(next.tag);
          var nextResult = this.get(nextIndex);
          this.selected = nextResult.tag;
          nextResult.ref.focus();
        });
      } else {
        this.$refs.input.focus();
      }
    },
    get (method) {

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
          var nextIndex = (this.data.length - 1);
          break;
        default:
          var nextIndex = method;
      }

      var nextTag = this.data[nextIndex];
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
    navigate (method) {

      var result = this.get(method);

      if(result) {
        result.ref.focus();
        this.selected = result.tag;
      } else if(method === 'next') {
        this.$refs.input.focus();
        this.selected = null;
      }

    },
    leaveInput (e) {

      if(e.target.selectionStart === 0 && e.target.selectionStart === e.target.selectionEnd) {
        this.navigate('last');
        e.target.blur();
      }

    }
  }
}

</script>


<style lang="scss">

  .kirby-tags-field .kirby-input-content {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    cursor: text;

    [dir="ltr"] & {
      padding: 4px 0 0 4px;
    }
    [dir="rtl"] & {
      padding: 4px 4px 0 0;
    }
  }
  .kirby-tags-field .kirby-tag {
    margin-bottom: 4px;

    [dir="ltr"] & {
      margin-right: 4px;
    }
    [dir="rtl"] & {
      margin-left: 4px;
    }
  }
  .kirby-tags-field .kirby-tag.sortable-ghost {
    opacity: .2;
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
    margin-bottom: 4px;
    border-radius: 3px;

    [dir="ltr"] & {
      margin-right: 4px;
    }
    [dir="rtl"] & {
      margin-left: 4px;
    }
  }

</style>
