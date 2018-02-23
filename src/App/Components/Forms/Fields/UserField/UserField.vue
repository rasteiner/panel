<template>

  <kirby-field
    class="kirby-user-field"
    ref="field"
    v-bind="$props"
    :icon="control"
    @icon="clear"
    @blur="change">

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
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
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
