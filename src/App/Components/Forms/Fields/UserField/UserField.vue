<template>

  <kirby-field
    class="kirby-user-field"
    ref="field"
    v-bind="$props"
    :icon="control"
    @icon="clear">

    <template v-if="state">
      <span class="user-name">{{ state.text }}</span>
    </template>

    <template v-else>
      <kirby-autocomplete-input
        ref="input"
        :id="_uid"
        :options="options"
        @select="input"
      />
    </template>

  </kirby-field>

</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Icon from "Ui/Forms/Field/Mixins/Icon.js";
import Options from "Ui/Forms/Field/Mixins/Options.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

export default {
  mixins: [Field, Label, Help, Icon, Options, Required, Value],
  computed: {
    control() {
      return this.state ? "cancel" : this.icon;
    },
    stateToValue() {
      return this.state ? this.state.value : null;
    }
  },
  methods: {
    clear() {
      this.input();
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    setValue(value) {
      return value ? this.options.find(x => x.value === value) : null;
    }
  }
};
</script>

<style lang="scss">
.kirby-user-field .kirby-input-content {
  position: relative;
  display: flex;
}

.kirby-user-field .kirby-input-content > .user-name {
  display: flex;
  align-items: center;
  padding: 0.45rem;
}

.kirby-user-field .kirby-autocomplete-input > input {
  border: 0;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5rem;
  width: 100%;
  resize: none;
  background: none;

  &:focus {
    outline: none;
  }
}
</style>
