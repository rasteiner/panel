<template>
  <kirby-text-field
    class="kirby-email-field"
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
      default: "email"
    },
    label: {
      default: "Email"
    },
    name: {
      default: "email"
    },
    placeholder: {
      default: "mail@example.com"
    },
    type: {
      default: "email"
    }
  }
};
</script>
