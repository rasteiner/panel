<template>

  <kirby-field class="kirby-select-field" v-bind="$props" :id="id">
    <kirby-select-input
      :id="id"
      :name="name"
      :options="options"
      :value="state"
      @input="input"
    />
  </kirby-field>

</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-select-field .kirby-select-input select {
  width: calc(100% + 3rem);

  [dir="ltr"] & {
    right: -3rem;
  }
  [dir="rtl"] & {
    left: -3rem;
  }
}

.kirby-select-field .kirby-input-icon {
  pointer-events: none;
}
</style>
