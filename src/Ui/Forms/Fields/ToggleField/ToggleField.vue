<template>
  <kirby-field class="kirby-toggle-field" v-bind="$props">
    <span class="kirby-toggle-input">
      <input type="checkbox" v-model="data" :id="name" />
      <label :for="name">{{ state }}</label>
    </span>
  </kirby-field>
</template>

<script>

import Props from '../Field.props.js';

export default {
  mixins: [Props],
  props: {
    label: {
      type: String
    },
    text: {
      type: String
    },
    on: {
      type: String
    },
    off: {
      type: String
    },
    name: {
      type: String,
      default: 'toggle'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    state () {
      if (this.on && this.off) {
        return this.data ? this.on : this.off;
      }

      return this.text;
    }
  }
}

</script>

<style lang="scss">
  .kirby-toggle-field .kirby-input-content {
    padding: .65rem;
  }

  .kirby-toggle-input > input {
    position: relative;
    top:      4px;
    width:    38px;
    height:   20px;
    border-radius: 38px;
    outline: none;
    cursor: pointer;
    background-color: $color-light;
    -webkit-appearance: none;
    appearance: none;

    [dir="ltr"] & {
      margin-right: .5rem;
    }
    [dir="rtl"] & {
      margin-left: .5rem;
    }
  }

  .kirby-toggle-input > input::before {
    content: "";
    position: absolute;
    top: 2px;
    height: 16px;
    width:  16px;
    background: $color-white;
    border-radius: 100%;
    transition: all ease-in-out .1s;

    [dir="ltr"] & {
      left: 2px;
    }
    [dir="rtl"] & {
      right: 2px;
    }
  }

  .kirby-toggle-input > input:focus {
    border-color: $color-focus;
    box-shadow: 0 0 0 3px rgba($color-focus, 0.25);
  }

  .kirby-toggle-input > input:checked {
    background-color: $color-focus;
  }

  .kirby-toggle-input > input:checked::before {
    [dir="ltr"] & {
      left: 20px;
    }
    [dir="rtl"] & {
      right: 20px;
    }
  }

  .kirby-toggle-input > label {
    cursor: pointer;
  }

</style>
