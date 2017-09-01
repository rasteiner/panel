<template>
  <div class="kirby-radio-inputs">
    <span
    v-for="option in options"
    :key="option.value"
    class="kirby-radio-input">
      <input
      type="radio"
      :name="name"
      :value="option.value"
      :id="name + '_' + option.value"
      @change="$emit('input', option.value)"
      class="kirby-radio-input" />
      <label :for="name + '_' + option.value">
        {{ option.text }}
      </label>
    </span>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: 'radio'
    }
  }
}

</script>

<style lang="scss">

$color-radio-border: #d0d2d4;
$color-radio-focus: #567896;

.kirby-radio-input {
  position: relative;
  display: flex;
}
.kirby-radio-input input {
  opacity: 0;
  margin-right: 1rem;
}
.kirby-radio-input label {
  font-size: $font-size-small;
  font-family: $font-family-mono;
  cursor: pointer;
  display: block;
  flex-grow: 1;
  min-height: 1.25rem;
}
.kirby-radio-input label::before{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: $color-white;
  border: 2px solid $color-radio-border;
  cursor: pointer;
  transition: all .2s;
}
.kirby-radio-input input + label::after {
  position: absolute;
  content: none;
  top: 50%;
  left: 4px;
  margin-top: -4px;
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
}
.kirby-radio-input input:checked + label::before {
  border-color: $color-dark;
}
.kirby-radio-input input:focus + label::before {
  border-color: $color-radio-focus;
  box-shadow: 0 0 0 3px rgba($color-radio-focus, 0.25);
}
.kirby-radio-input input:checked + label::after {
  content: "";
  background: $color-dark;
}
.kirby-radio-input input:focus + label::after {
    background: $color-radio-focus;
}

</style>
