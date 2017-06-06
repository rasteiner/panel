<template>
  <div class="kirby-input" :data-focus="isFocused" :data-error="error">
    <span v-if="$slots.prefix" class="kirby-input-prefix">
      <slot name="prefix" />
    </span>
    <span class="kirby-input-element">
      <slot name="input" />
    </span>
    <span v-if="$slots.icon" @click="focus" class="kirby-input-icon">
      <slot name="icon" />
    </span>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      isFocused: false
    }
  },
  mounted: function() {
    
    this.$el.addEventListener('focus', function() {
      this.isFocused = true;
    }.bind(this), true);
    
    this.$el.addEventListener('blur', function() {
      this.isFocused = false;
    }.bind(this), true);

  },
  methods: {
    focus: function() {

      var input = this.$el.querySelector('input:first-child, textarea:first-child, select:first-child');
      
      if(input) {
        input.focus();
      }

    }
  }
}

</script>

<style>

.kirby-input {
  display: flex;
  align-items: stretch;
  border: 2px solid #ddd;
  background: #fff;
}
.kirby-input[data-focus] {
  border-color: #8dae28;
}
.kirby-input[data-error] {
  border-color: #b3000a;
}
.kirby-input[data-error][data-focus] {
  border-color: #000;
}
.kirby-input-prefix {
  width: 2.5rem;
  margin-right: .5rem;
}
.kirby-input-element {
  flex-grow: 1;  
  min-height: 2.5rem;
}
.kirby-input-element > input,
.kirby-input-element > textarea {
  border: 0;
  font: inherit;
  line-height: 1.5em;
  padding: .5rem;
  width: 100%;
  resize: none;
  background: none;
}
.kirby-input-element > input:focus,
.kirby-input-element > textarea:focus {
  outline: 0;
}
.kirby-input-icon {
  width: 3rem;
  border-left: 1px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
}

</style>
