<template>
  <kirby-button-group v-if="hasChanges">
    <kirby-button icon="undo" @click="$events.$emit('form.reset')" state="negative">Revert</kirby-button>
    <kirby-button icon="smile" @click="$events.$emit('form.save')" state="positive">Save</kirby-button>
  </kirby-button-group>
</template>

<script>
export default {
  props: {
    id: String
  },
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
      this.hasChanges = this.$store.state.changes[this.id] === true;
    }
  }
};
</script>
