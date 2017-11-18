<template>
  <div class="kirby-radio-inputs">
    <template v-if="hasOptions">
      <span v-for="option in options"
      :key="option.value"
      class="kirby-radio-input">
        <input type="radio"
        :name="_uid"
        :value="option.value"
        :id="_uid + '_' + option.value"
        v-model="data"
        class="kirby-radio-input" />
        <label :for="_uid + '_' + option.value">
          {{ option.text }}
          <div v-if="option.info" class="kirby-radio-input-info">
            {{ option.info }}
          </div>
        </label>
      </span>
    </template>
     <template v-else>
      <span class="empty">No options available</span>
    </template>
  </div>
</template>

<script>

import Input from '../Input.mixin.js';

export default {
  mixins: [Input],
  props: {
    options: {
      type: Array,
      default: []
    },
    info: {
      type: String
    }
  },
  computed: {
    hasOptions () {
      return this.options && this.options.length > 0;
    }
  }
}

</script>

<style lang="scss">

$color-radio-border: #8b8e94;
$color-radio-focus: #567896;
$radio-focus-outline: 0 0 0 3px rgba(108,166,217,0.25);

$radio-width: 16px;
$radio-height: 16px;
$radio-offset-y: 6px;
$radio-label-gap: 8px;


.kirby-radio-inputs > * + * {
  margin-top: 4px;
}

.kirby-radio-input {
  position: relative;
  display: block;

  [dir="ltr"] & {
    padding-left: $radio-width + $radio-label-gap;
  }

  [dir="rtl"] & {
    padding-right: $radio-width + $radio-label-gap;
  }
}

.kirby-radio-input input {
  position: absolute;
  top: $radio-offset-y;
  width: $radio-width + $radio-label-gap;
  height: $radio-height;

  /* remove default browser styling to make checkbox
     resizeable */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  opacity: 0;
  cursor: pointer;

  [dir="ltr"] & {
    left: 0;
  }

  [dir="rtl"] & {
    right: 0;
  }
}

.kirby-radio-input label {
  display: block;
  // font-size: $font-size-small;
  // font-family: $font-family-mono;
  line-height: 28px;
  min-height: 28px;
  cursor: pointer;
}

/* radio button background */
.kirby-radio-input label::before {
  content: "";
  position: absolute;
  top: $radio-offset-y;
  height: $radio-width;
  width: $radio-height;

  background-color: $color-white;
  border: 2px solid $color-radio-border;
  border-radius: 50%;
  cursor: pointer;

  transition:
    background-color .2s,
    border-color .2s;

  [dir="ltr"] & {
    left: 0;
  }
  [dir="rtl"] & {
    right: 0;
  }
}

/* radio button dot */
.kirby-radio-input input + label::after {
  content: '';
  position: absolute;
  top: $radio-offset-y + 5px;
  height: 6px;
  width: 6px;
  background-color: $color-white;
  border-radius: 50%;
  transform: scale(0);
  transition:
    transform .2s;

  [dir="ltr"] & {
    left: 5px;
  }
  [dir="rtl"] & {
    right: 5px;
  }
}


/* focus + active */
.kirby-radio-input input:focus + label::before,
.kirby-radio-input input:active + label::before {
  box-shadow: $radio-focus-outline;
  border-color: $color-radio-focus;
}

/* unselected active */
.kirby-radio-input input:active + label::before {
  background-color: mix($color-radio-focus, $color-white, 30%);
}

/* checked */
.kirby-radio-input input:checked + label::before {
  background-color: $color-dark;
  border-color: $color-dark;
}

.kirby-radio-input input:checked + label::after {
  transform: none;
}

/* checked + active */
.kirby-radio-input input:checked:active + label::before {
  background-color: $color-radio-focus;
  border-color: $color-radio-focus;
}


// /* checked */
// .kirby-radio-input input:checked + label::before {
//   background-color: $color-dark;
//   border-color: $color-dark;
// }

// /* focus + active */
// .kirby-radio-input input:focus + label::before,
// .kirby-radio-input input:active + label::before {
//   border-color: $color-radio-focus;
//   box-shadow: $radio-focus-outline;
// }

// /* checked */
// .kirby-radio-input input:checked + label::after {
//   opacity: 1;
//   transform: none;
// }

// /* checked + active */
// .kirby-radio-input input:active + label::before {
//   background-color: $color-radio-focus;
//   border-color: $color-radio-focus;
// }

.kirby-radio-input-info {
  font-size: .8em;
  line-height: 1.2;
  color: $color-light-grey;
}


.kirby-radio-inputs .empty {
  color: $color-light-grey;
}

</style>
