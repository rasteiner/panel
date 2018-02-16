<template>
  <kirby-text-field
    class="kirby-tel-field"
    v-bind="$props"
    :value="state"
    @input="input"
  />
</template>

<script>

import TextField from 'Ui/Forms/Fields/TextField/TextField.vue';

export default {
  extends: TextField,
  props: {
    name: {
      default: 'phone'
    },
    type: {
      default: 'tel'
    },
    icon: {
      default: 'phone'
    },
    label: {
      default: 'Phone'
    }
  }
}

</script>
