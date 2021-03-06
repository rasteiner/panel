<template>

  <div class="kirby-checkbox-input" :data-disabled="disabled">
    <input
      :id="name || _uid"
      type="checkbox"
      :checked="state"
      :disabled="disabled"
      @change="input($event.target.checked)"
    />
    <label :for="name || _uid">
      <span class="checkbox" aria-hidden="true">
        <svg width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5l3.3 3L11 1" stroke-width="2" fill="none" fill-rule="evenodd" />
        </svg>
      </span>
      {{ text }}
    </label>
  </div>

</template>

<script>
import Input from "Ui/Forms/Input/Input.mixin.js";

export default {
  mixins: [Input],
  props: {
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    }
  }
};
</script>

<style lang="scss">
$color-checkbox-focus: #567896;
$color-checkbox-border: #8b8e94;
$checkbox-focus-outline: 0 0 0 3px rgba(108, 166, 217, 0.25);

$checkbox-width: 16px;
$checkbox-height: 16px;
$checkbox-label-gap: 10px;

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

.kirby-checkbox-input input,
.kirby-checkbox-input .checkbox {
  position: absolute;
  top: 50%;
  margin-top: -1px;
  transform: translateY(-50%);
  height: $checkbox-height;
  cursor: pointer;

  [dir="ltr"] & {
    left: 0;
  }

  [dir="rtl"] & {
    right: 0;
  }
}

.kirby-checkbox-input input  {
  width: $checkbox-width + $checkbox-label-gap;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  opacity: 0;
}

.kirby-checkbox-input .checkbox {
  width: $checkbox-width;
  background-color: $color-white;

  border: 2px solid $color-checkbox-border;
  border-radius: 2px;

  transition: background-color 0.2s, border-color 0.2s;

  svg {
    position: absolute;
    top: 1px;
    left: 0;
  }

  path {
    stroke: $color-white;
    stroke-dasharray: 14.149505615234375;
    stroke-dashoffset: 14.149505615234375;
    transition: stroke-dashoffset 0.2s;
  }
}

.kirby-checkbox-input label {
  display: block;
  line-height: 28px;
  min-height: 28px;
  cursor: pointer;
}

.kirby-checkbox-input input {
  /* focus + active */
  &:focus ~ label .checkbox,
  &:active ~ label .checkbox {
    box-shadow: $checkbox-focus-outline;
    border-color: $color-checkbox-focus;
  }

  /* unchecked active */
  &:active ~ label .checkbox {
    background-color: mix($color-checkbox-focus, $color-white, 30%);
  }

  /* checked */
  &:checked ~ label .checkbox {
    background-color: $color-dark;
    border-color: $color-dark;

    path {
      stroke-dashoffset: 0;
    }
  }

  /* checked + active */
  &:checked:active ~ label .checkbox {
    background-color: $color-checkbox-focus;
    border-color: $color-checkbox-focus;
  }
}
</style>
