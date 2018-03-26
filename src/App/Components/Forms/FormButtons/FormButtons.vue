<template>
  <kirby-button-group v-if="hasChanges">
    <kirby-button class="kirby-form-button" icon="undo" @click="$events.$emit('form.reset')" state="negative">Revert</kirby-button>
    <kirby-button class="kirby-form-button" icon="check" @click="$events.$emit('form.save')" state="positive">Save</kirby-button>
  </kirby-button-group>
</template>

<script>
export default {
  data() {
    return {
      hasChanges: false
    };
  },
  created() {
    this.$events.$on("form.changed", this.changed);
    this.$events.$on("form.unchanged", this.changed);
  },
  destroyed() {
    this.$events.$off("form.changed", this.changed);
    this.$events.$off("form.unchanged", this.changed);
  },
  methods: {
    changed() {
      this.hasChanges = this.$store.state.changes[this.$route.path] === true;
    }
  }
};
</script>

<style lang="scss">
.kirby-form-button {
  font-weight: 500;
}
</style>
