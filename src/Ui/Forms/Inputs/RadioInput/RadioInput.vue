<template>
  <div class="kirby-radio-inputs">
    <template v-if="hasOptions">
      <span
        class="kirby-radio-input"
        v-for="option in options"
        :key="option.value">

        <input
          class="kirby-radio-input"
          type="radio"
          :name="_uid"
          :id="_uid + '_' + option.value"
          :value="option.value"
          :disabled="disabled"
          :checked="state === option.value"
          @change="input($event.target.value)"
        />

        <label :for="_uid + '_' + option.value">

          {{ option.text }}

          <div v-if="option.info" class="kirby-radio-input-info">
            {{ option.info }}
          </div>

        </label>
      </span>
    </template>
     <template v-else>
      <kirby-box state="empty">
        No options available
      </kirby-box>
    </template>
  </div>
</template>

<script>
import Input from "Ui/Forms/Input/Input.mixin.js";

export default {
  mixins: [Input],
  props: {
    disabled: Boolean,
    options: {
      type: Array,
      default: []
    },
    info: {
      type: String
    }
  },
  computed: {
    hasOptions() {
      return this.options && this.options.length > 0;
    }
  }
};
</script>

<style lang="scss">
$color-radio-border: #8b8e94;
$color-radio-focus: #567896;
$radio-focus-outline: 0 0 0 3px rgba(108, 166, 217, 0.25);

$radio-width: 16px;
$radio-height: 16px;
$radio-offset-y: 6px;
$radio-label-gap: 8px;

.kirby-radio-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-column-gap: 1.5rem;
}
.kirby-radio-input {
  min-width: 0;
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

  transition: background-color 0.2s, border-color 0.2s;

  [dir="ltr"] & {
    left: 0;
  }
  [dir="rtl"] & {
    right: 0;
  }
}

/* radio button dot */
.kirby-radio-input input + label::after {
  content: "";
  position: absolute;
  top: $radio-offset-y + 5px;
  height: 6px;
  width: 6px;
  background-color: $color-white;
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.2s;

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

.kirby-radio-input-info {
  font-size: 0.8em;
  line-height: 1.2;
  color: $color-light-grey;
  margin-bottom: 0.4rem;
}
</style>
