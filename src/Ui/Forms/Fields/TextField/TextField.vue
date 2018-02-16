<template>
  <kirby-field v-bind="fieldProps">
    <template slot="options" v-if="maxlength">
      <kirby-counter
        :value="state"
        :min="minlength"
        :max="maxlength"
      />
    </template>
    <input
      class="kirby-text-input"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :id="name"
      :name="name"
      :maxlength="maxlength"
      :minlength="minlength"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      :spellcheck="spellcheck"
      :type="type"
      :value="state"
      @input="input($event.target.value)"
    />
  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    minlength: {
      type: Number
    },
    pattern: {
      type: String
    },
    placeholder: {
      type: String
    },
    spellcheck: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number]
    }
  }
};
</script>
