<template>
  <div class="kirby-input-container" :data-focus="isFocused" :data-error="error">
    <span v-if="$slots.prefix" class="kirby-input-container-prefix">
      <slot name="prefix" />
    </span>
    <span class="kirby-input-container-content">
      <slot name="input" />
    </span>
    <span v-if="$slots.icon" @click="focus" class="kirby-input-container-icon">
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

<style lang="scss">

.kirby-input-container {
  display: flex;
  align-items: stretch;
  border: 2px solid #ddd;
  background: #fff;
}
.kirby-input-container[data-focus] {
  border-color: $color-positive;
}
.kirby-input-container[data-error] {
  border-color: $color-negative;
}
.kirby-input-container[data-error][data-focus] {
  border-color: #000;
}
.kirby-input-container-prefix {
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: .8em;
  color: #777;
}
.kirby-input-container-content {
  flex-grow: 1;  
  min-height: 2.5rem;
}
.kirby-input-container-content > input,
.kirby-input-container-content > textarea,
.kirby-input-container-content > .kirby-select {
  border: 0;
  font: inherit;
  line-height: 1.5em;
  padding: .5rem;
  width: 100%;
  resize: none;
  background: none;
}
.kirby-input-container-content > input:focus,
.kirby-input-container-content > textarea:focus {
  outline: 0;
}
.kirby-input-container-icon {
  width: 3rem;
  border-left: 1px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
}

</style>
