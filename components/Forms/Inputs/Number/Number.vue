<template>
  <div class="kirby-number">
    <input ref="input" type="number" @input="input($event.target.value)" :value="number" :min="min" :max="max" :step="step">
    <kirby-button @click="increase" icon="caret-up"></kirby-button>
    <kirby-button @click="decrease" icon="caret-down"></kirby-button>
  </div>
</template>

<script>

import Button from '../../../Buttons/Button/Button.vue'

export default {
  components: {
    'kirby-button': Button
  },
  props: {
    value: {
      type: Number
    },
    required: {
      type: Boolean
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data: function() {

    var type = Number.isInteger(this.step) ? 'int' : 'float';

    return {
      val: this.value,
      inc: type === 'int' ? parseInt(this.step) : parseFloat(this.step),
      type: type
    };

  },
  computed: {
    number: function() {
      
      if(!this.val && this.val !== 0) {
        return null;
      } else if(this.type === 'int') {
        var number = parseInt(this.val);        
      } else {
        var number = parseFloat(this.val);
      }

      if(number > this.max) {
        number = this.max;
      }

      if(number < this.min) {
        number = this.min;
      }

      return number;

    }
  },
  methods: {
    focus: function() {
      this.$refs.input.focus();
    },
    modify: function(value) {

      var number = this.number || 0;

      number = number + (this.inc * value);

      this.input(number);

    },
    increase: function() {
      this.modify(1);
    },
    decrease: function() {
      this.modify(-1);
    },
    set: function(value) {
      this.val = value;
    },
    input: function(value) {
      this.set(value);
      this.$emit('input', this.number);
    }
  }
}

</script>

<style lang="scss">

.kirby-number {
  display: flex;
}
.kirby-number input {
  font: inherit;
  line-height: 1.5em;
  flex-grow: 1;
  border: 0;
  padding: .5rem;
  outline: 0;
}
.kirby-number input::-webkit-outer-spin-button,
.kirby-number input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.kirby-number .kirby-button {
  width: 3rem;
  background: $color-white;
  border-left: 1px dashed $color-border;
}
.kirby-number .kirby-button:focus {
  position: relative;
  background: $color-positive;
  color: $color-light;  
  border-left: 1px solid $color-positive;
  right: -1px;
}

</style>
