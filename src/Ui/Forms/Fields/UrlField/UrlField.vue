<template>
  <kirby-text-field
    class="kirby-url-field"
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
      default: 'url'
    },
    type: {
      default: 'url'
    },
    label: {
      default: 'URL'
    },
    icon: {
      default: 'chain'
    },
    placeholder: {
      default: 'https://'
    }
  }
}

</script>
