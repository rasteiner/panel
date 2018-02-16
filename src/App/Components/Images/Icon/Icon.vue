<template>
  <ui-icon :alt="alt" :source="source" />
</template>

<script>
import Icon from "Ui/Images/Icon/Icon.vue";

export default {
  components: {
    "ui-icon": Icon
  },
  props: {
    type: {
      type: String
    },
    alt: {
      type: String
    }
  },
  computed: {
    source() {
      return `${window.panel.config.assets}/icons/${this.type}.svg`;
    }
  }
};
</script>
