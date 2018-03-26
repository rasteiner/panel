<template>
  <kirby-button @click="$store.dispatch('notification', null)" class="kirby-notification" :state="state" :icon="icon">
    {{ message }}
  </kirby-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    message: {
      type: String
    }
  },
  computed: {
    icon() {
      switch (this.type) {
        case "success":
          return "smile";
        case "error":
          return "alert";
      }
    },
    state() {
      switch (this.type) {
        case "success":
          return "positive";
        case "error":
          return "negative";
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-notification {
  font-weight: 500;
  white-space: nowrap;
}
</style>
