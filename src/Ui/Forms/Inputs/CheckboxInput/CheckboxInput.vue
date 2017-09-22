<template>
  <span class="kirby-checkbox-input">
    <input type="checkbox" v-model="data" :id="_uid" class="kirby-checkbox-input" :checked="data" />
    <label :for="_uid">
      <span class="kirby-checkbox-styled" aria-hidden="true">
        <svg width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5l3.3 3L11 1" stroke-width="2" fill="none" fill-rule="evenodd" />
        </svg>
      </span>
      {{ label }}
    </label>
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
$color-checkbox-focus: #567896;
$color-checkbox-border: #8b8e94;
$checkbox-focus-outline: 0 0 0 3px rgba(108,166,217,0.25);

$checkbox-width: 16px;
$checkbox-height: 16px;
$checkbox-offset-y: 6px;
$checkbox-label-gap: 8px;


.kirby-checkbox-input {
  position: relative;
  display: block;
  /* create new stacking context to prevent positioned
    stacking side-effects with other components */
  z-index: 0;

  [dir="ltr"] & {
    padding-left: $checkbox-width + $checkbox-label-gap;
  }

  [dir="rtl"] & {
    padding-right: $checkbox-width + $checkbox-label-gap;
  }
}

.kirby-checkbox-input input {
  position: absolute;
  top: $checkbox-offset-y;
  width: $checkbox-width + $checkbox-label-gap;
  height: $checkbox-height;
  cursor: pointer;

  /* remove default browser styling to make checkbox
     resizeable */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  opacity: 0;

  [dir="ltr"] & {
    left: 0;
  }

  [dir="rtl"] & {
    right: 0;
  }
}

.kirby-checkbox-styled {
  position: absolute;
  display: block;
  top: $checkbox-offset-y;
  width: $checkbox-width;
  height: $checkbox-height;
  background-color: $color-white;

  border: 2px solid $color-checkbox-border;
  border-radius: 2px;

  transition:
    background-color .2s,
    border-color .2s;

  [dir="ltr"] & {
    left: 0;
  }

  [dir="rtl"] & {
    right: 0;
  }

  svg {
    position: absolute;
    top: 1px;
    left: 0;
  }

  path {
    stroke: $color-white;
    stroke-dasharray: 14.149505615234375;
    stroke-dashoffset: 14.149505615234375;
    transition:
      stroke-dashoffset .2s;
  }
}

.kirby-checkbox-input input {
  
  /* focus + active */
  &:focus ~ label .kirby-checkbox-styled,
  &:active ~ label .kirby-checkbox-styled {
    box-shadow: $checkbox-focus-outline;
    border-color: $color-checkbox-focus;
  }

  /* unchecked active */
  &:active ~ label .kirby-checkbox-styled {
    background-color: mix($color-checkbox-focus, $color-white, 30%);
  }

  /* checked */
  &:checked ~ label .kirby-checkbox-styled {
    background-color: $color-dark;
    border-color: $color-dark;

    path {
      stroke-dashoffset: 0;
    }
  }

  /* checked + active */
  &:checked:active ~ label .kirby-checkbox-styled {
    background-color: $color-checkbox-focus;
    border-color: $color-checkbox-focus;
  }
}

.kirby-checkbox-input label {
  display: block;
  //font-size: $font-size-small;
  //font-family: $font-family-mono;
  //margin-left: 24px;
  line-height: 28px;
  min-height: 28px;
  cursor: pointer;
}

</style>
