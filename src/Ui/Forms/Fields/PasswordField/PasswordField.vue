<template>
  <kirby-text-field
    class="kirby-password-field"
    v-bind="$props"
    :value="state"
    @input="input"
  />
</template>

<script>
import TextField from "Ui/Forms/Fields/TextField/TextField.vue";

export default {
  extends: TextField,
  props: {
    name: {
      default: "password"
    },
    type: {
      default: "password"
    },
    label: {
      default: "Password"
    },
    icon: {
      default: "key"
    }
  }
};
</script>
