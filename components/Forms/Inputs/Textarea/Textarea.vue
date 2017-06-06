<template>
  <textarea 
    ref="textarea" 
    spellcheck="false" 
    class="kirby-textarea" 
    @input="$emit('input', $event.target.value)" 
    :value="value">  
  </textarea>
</template>

<script>

import autosize from './autosize.js';

export default {
  props: {
    value: String,
    autosize: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    focus: function() {
      this.$refs.textarea.focus();
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      autosize(this.$el);
    });
  }
}

</script>

<style>

.kirby-textarea {
  font: inherit;
  line-height: 1.5em;
  resize: none;
  width: 100%;
  background: none;
  border: 0;
}
.kirby-textarea:focus {
  outline: 0;
}

</style>