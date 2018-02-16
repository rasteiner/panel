<template>
  <kirby-text-field
    class="kirby-tel-field"
    v-bind="$props"
    :value="state"
    @input="input"
  />
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    icon: {
      default: "phone"
    },
    label: {
      default: "Phone"
    },
    name: {
      default: "phone"
    },
    type: {
      default: "tel"
    }
  }
};
</script>
