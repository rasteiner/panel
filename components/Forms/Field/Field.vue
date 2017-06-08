<template>
  <div class="kirby-field" :data-required="required" :data-error="error">
    <div v-if="$slots['label'] || $slots['options']" class="kirby-field-header">
      <slot name="label"></slot>
      <slot name="options"></slot>
    </div>
    <slot name="content"></slot>
    <div v-if="$slots['help']" class="kirby-field-help">
      <slot name="help"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: ['required', 'error']  
}

</script>

<style lang="scss">

.kirby-field-header {
  display: flex;
  padding-bottom: .5rem;
}
.kirby-field-header label {
  display: block;
  font-weight: 500;
  flex-grow: 1;
  line-height: 1.5em;
}
.kirby-field[data-error] .kirby-field-header label {
  color: #b3000a;
}
.kirby-field[data-required] .kirby-field-header label:after {
  content: "*";
  color: #8dae28;
  padding-left: .35rem;
}
.kirby-field[data-required][data-error] .kirby-field-header label:after {
  color: #b3000a;
}

.kirby-field-help {
  padding: .5rem 0;
  font-size: .9em;
  color: #777;
}
.kirby-field[data-error] .kirby-field-help {
  color: #b3000a;
}

</style>
