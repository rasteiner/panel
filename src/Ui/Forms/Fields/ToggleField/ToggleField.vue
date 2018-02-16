<template>
  <kirby-field class="kirby-toggle-field" v-bind="$props">
    <span class="kirby-toggle-input">
      <input
        type="checkbox"
        :id="name"
        @change="input($event.target.checked)"
      />
      <label :for="name">{{ display }}</label>
    </span>
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      default: 'toggle'
    },
    value: {
      type: Boolean,
      default: false
    },
    label: {
      default: 'Toggle'
    },
    text: {
      type: [String, Array]
    }
  },
  computed: {
    display () {
      if (Array.isArray(this.text)) {
        return this.state ? this.text[1] : this.text[0];
      }

      return this.text
    }
  }
}

</script>

<style lang="scss">
  .kirby-toggle-field .kirby-input-content {
    padding: .5rem .65rem .75rem;
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
