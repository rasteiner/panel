<template>
  <kirby-field class="kirby-calendar-field" v-bind="fieldProps" @focus="show" @blur="hide">

    <input :value="state | date('DATE_SHORT')" :readonly="true" />

    <kirby-calendar
      v-if="open"
      :current="state"
      @input="input"
    />

  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';
import Calendar from './Calendar.vue';

export default {
  mixins: [Field],
  components: {
    'kirby-calendar': Calendar
  },
  props: {
    label: {
      default: 'Calendar'
    },
    name: {
      default: 'calendar'
    },
    icon: {
      default: 'calendar'
    }
  },
  data () {
    return {
      state: this.value,
      open: false
    }
  },
  methods: {
    input (state) {
      this.state = state
      this.$emit('input', this.state)
    },
    show () {
      this.open = true
    },
    hide () {
      this.open = false
    }
  }
}

</script>

<style lang="scss">

.kirby-calendar-field .kirby-input-content {
  position: relative;
}

.kirby-calendar-field .kirby-calendar {
  position: absolute;
  top: calc(100% + 14px);
  right: -48px;
  z-index: z-index(dropdown);

  &::before {
    $tooltip-size: 8px;
    position: absolute;
    content: '';
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

