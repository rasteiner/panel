<template>
  <div class="kirby-field" :data-required="required" :data-error="error">

    <div v-if="$slots.label || $slots.options || label" class="kirby-field-header">
      <slot name="label">
        <label :for="name">{{ label }}</label>
      </slot>
      <slot name="options"></slot>
    </div>

    <slot v-if="$slots.content" name="content"></slot>
    <kirby-input v-else :icon="icon" :prefix="prefix">
      <slot></slot>
    </kirby-input>

    <div v-if="$slots.help || help" class="kirby-field-help">
      <slot name="help">
        <p>{{ help }}</p>
      </slot>
    </div>

  </div>
</template>

<script>

export default {
  props: [
    'required',
    'error',
    'label',
    'help',
    'name',
    'prefix',
    'icon'
  ]
}

</script>

<style lang="scss">

.kirby-field-header {
  display: flex;
  padding: 1rem 0 1rem;
}
.kirby-field-header label {
  display: block;
  font-weight: 500;
  flex-grow: 1;
  line-height: 1.5em;
  margin-bottom: -1px;
}
.kirby-field-header .kirby-button-group .kirby-button {
  padding-top: 0;
  padding-bottom: 0;
}
.kirby-field[data-error] .kirby-field-header label {
  color: $color-negative;
}
.kirby-field[data-required] .kirby-field-header label:after {
  content: "*";
  color: $color-focus;

  [dir="ltr"] & {
    padding-left: .35rem;
  }
  [dir="rtl"] & {
    padding-right: .35rem;
  }
}
.kirby-field[data-required][data-error] .kirby-field-header label:after {
  color: $color-negative;
}

.kirby-field-help {
  padding: .5rem 0;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  color: $color-dark-grey;
}
.kirby-field[data-error] .kirby-field-help {
  color: $color-negative;
}

</style>
