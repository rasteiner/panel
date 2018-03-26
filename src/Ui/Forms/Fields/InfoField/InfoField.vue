<template>
  <div class="kirby-info-field">
    <kirby-headline>{{ label }}</kirby-headline>
    <kirby-txt v-html="text" />
  </div>
</template>

<script>
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Text from "Ui/Forms/Field/Mixins/Text.js";

export default {
  mixins: [Label, Text]
};
</script>
