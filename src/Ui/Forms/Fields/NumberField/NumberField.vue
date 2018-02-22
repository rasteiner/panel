<template>
  <kirby-field class="kirby-number-field" v-bind="$props">
    <input
      type="number"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :value.number="state"
      @input="input($event.target.value)"
      @focus="hasChanged = false"
      @change="hasChanged = true"
      @blur="blur"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    value: [Number, String],
    placeholder: {
      type: String
    },
    min: {
      type: Number,
      default: 0
    },
    max: Number,
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      hasChanged: false
    };
  },
  methods: {
    blur() {
      if (this.hasChanged === true) {
        this.$emit("change", this.state);
      }
    }
  }
};
</script>
