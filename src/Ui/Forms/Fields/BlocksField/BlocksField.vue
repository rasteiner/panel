<template>
  <kirby-field v-bind="$props">
    <kirby-blocks :value="state" @input="input" />
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field]
}

</script>
