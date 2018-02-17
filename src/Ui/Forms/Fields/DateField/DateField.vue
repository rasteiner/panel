<template>
  <kirby-field class="kirby-date-field" v-bind="$props" @focus="show" @blur="hide">

    <template v-if="display === 'calendar'">
      <input :value="state | date('DATE_SHORT')" :readonly="true" />

      <kirby-calendar-input
        v-if="open"
        :current="state"
        @input="input"
      />
    </template>

    <template v-else>
      <kirby-date-input
        :range="range"
        :value="state"
        @input="input"
      />
    </template>

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    name: {
      default: "date"
    },
    label: {
      default: "Date"
    },
    icon: {
      default: "calendar"
    },
    display: {
      type: String
    },
    range: {
      type: [Boolean, Number],
      default: 10
    }
  },
  data() {
    return {
      state: this.value,
      open: false
    };
  },
  methods: {
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    }
  }
};
</script>

<style lang="scss">
.kirby-date-field .kirby-input-content {
  position: relative;
}

.kirby-date-field .kirby-date-selects {
  background: $color-white;
}

.kirby-date-field .kirby-calendar-input {
  position: absolute;
  top: calc(100% + 14px);
  right: -48px;
  z-index: z-index(dropdown);

  &::before {
    $tooltip-size: 8px;
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    right: 15px;
    top: $tooltip-size * -1;
    border-style: solid;
    border-width: 0 $tooltip-size $tooltip-size $tooltip-size;
    border-color: transparent transparent $color-dark transparent;
  }
}
</style>
