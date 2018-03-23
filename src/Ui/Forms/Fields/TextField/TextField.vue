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

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Icon from "Ui/Forms/Field/Mixins/Icon.js";
import Placeholder from "Ui/Forms/Field/Mixins/Placeholder.js";
import Prefix from "Ui/Forms/Field/Mixins/Prefix.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [Field, Label, Help, Icon, Placeholder, Prefix, Required, Value],
  props: {
    value: String,
    type: {
      type: String,
      default: "text"
    },
    minLength: Number,
    maxLength: Number,
    pattern: String,
    autocomplete: String,
    spellcheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>
