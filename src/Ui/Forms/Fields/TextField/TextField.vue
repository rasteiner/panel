<template>
  <kirby-field ref="field" :class="`kirby-${this.type}-field`" :id="_uid" v-bind="$props" @blur="change">

    <template slot="options" v-if="minLength || maxLength">
      <kirby-counter
        :value="state"
        :min="minLength"
        :max="maxLength"
      />
    </template>

    <input
      class="kirby-text-input"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :id="_uid"
      :name="name"
      :maxlength="maxLength"
      :minlength="minLength"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      :spellcheck="spellcheck"
      :type="type"
      :value="state"
      @focus="$refs.field.focus()"
      @input="input($event.target.value)"
    />

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    value: String,
    type: {
      type: String,
      default: "text"
    },
    minLength: Number,
    maxLength: Number,
    pattern: String,
    placeholder: String,
    autocomplete: String,
    spellcheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>
