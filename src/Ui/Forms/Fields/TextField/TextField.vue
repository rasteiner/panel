<template>
  <kirby-field ref="field" :class="`kirby-${this.type}-field`" :id="_uid" v-bind="$props" @blur="change">

    <template slot="options">
      <slot name="options">
        <kirby-counter v-if="minLength || maxLength"
          :disabled="disabled"
          :value="state"
          :min="minLength"
          :max="maxLength"
        />
      </slot>
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
      :disabled="disabled"
      :required="required"
      :spellcheck="spellcheck"
      :type="type"
      :value="state"
      @focus="$refs.field.focus()"
      @input="input($event.target.value)"
    />

    <template v-if="postfix" slot="icon">{{ postfix }}</template>

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
    prefix: String,
    postfix: String,
    placeholder: String,
    autocomplete: String,
    spellcheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>
