<template>
    <ui-icon v-bind="$props" :source="source" />
</template>

<script>

import Icon from 'Ui/Images/Icon/Icon.vue'


export default {
  extends: Icon,
  components: {
    'ui-icon': Icon
  },
  computed: {
    source () {
      return window.panel.config.assets + '/icons';
    }
  }
}

</script>
