<template>
  <span class="kirby-checkbox-input">
    <input type="checkbox" v-model="data" :id="_uid" class="kirby-checkbox-input" :checked="data" />
    <label :for="_uid">{{ label }}</label>
  </span>
</template>

<script>

import Props from '../Input.props.js';

export default {
  mixins: [Props],
  props: {
    label: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: this.value
    }
  },
  watch: {
    data (value) {
      this.$emit('input', value);
    }
  }
}

</script>

<style lang="scss">

$color-checkbox-border: #d0d2d4;
$color-checkbox-focus: #567896;

.kirby-checkbox-input {
  position: relative;
  display: flex;
}
.kirby-checkbox-input input {
  opacity: 0;

  [dir="ltr"] & {
    margin-right: 1rem;
  }
  [dir="rtl"] & {
    margin-left: 1rem;
  }
}
.kirby-checkbox-input label {
  font-size: $font-size-small;
  font-family: $font-family-mono;
  cursor: pointer;
  display: block;
  flex-grow: 1;
  min-height: 1.25rem;
}
.kirby-checkbox-input label::before{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 2px;
  background-color: $color-white;
  border: 2px solid $color-checkbox-border;
  cursor: pointer;
  transition: all .2s;

  [dir="ltr"] & {
    left: 0;
  }
  [dir="rtl"] & {
    right: 0;
  }
}
.kirby-checkbox-input input + label::after {
  position: absolute;
  content: none;
  top: 50%;
  margin-top: -4px;
  display: inline-block;
  height: 3px;
  width: 8px;
  border-left: 2px solid $color-light;
  border-bottom: 2px solid $color-light;
  transform: rotate(-45deg);
  transition: all .2s;

  [dir="ltr"] & {
    left: 3px;
  }
  [dir="rtl"] & {
    right: 3px;
  }
}
.kirby-checkbox-input input:focus + label::before {
  border-color: $color-checkbox-focus;
  box-shadow: 0 0 0 3px rgba($color-checkbox-focus, 0.25);
}
.kirby-checkbox-input input:checked:focus + label::before {
  background: $color-checkbox-focus;
  border-color: $color-checkbox-focus;
  box-shadow: 0 0 0 3px rgba($color-checkbox-focus, 0.25);
}
.kirby-checkbox-input input:checked + label::before {
  background: $color-dark;
  border-color: $color-dark;
}
.kirby-checkbox-input input:checked + label::after {
  content: "";
}

</style>
