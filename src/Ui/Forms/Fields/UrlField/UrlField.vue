<template>
  <kirby-text-field
    class="kirby-url-field"
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
    label: {
      default: "URL"
    },
    icon: {
      default: "chain"
    },
    name: {
      default: "url"
    },
    placeholder: {
      default: "https://"
    },
    type: {
      default: "url"
    }
  }
};
</script>
