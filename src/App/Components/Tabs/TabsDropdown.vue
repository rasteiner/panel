<template>
  <kirby-dropdown class="kirby-tabs-dropdown">
    <kirby-button class="kirby-tabs-dropdown-toggle" @click="$refs.tabs.toggle()" :key="tab.name + '-toggle'" :icon="tab.icon">{{ tab.label }}</kirby-button>
    <kirby-dropdown-content ref="tabs" align="right">
      <kirby-dropdown-item v-for="tab in tabs" :key="tab.name + '-dropdown-item'" @click="open(tab.name)" :icon="tab.icon">{{ tab.label }}</kirby-dropdown-item>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>
export default {
  props: {
    tabs: Array
  },
  data() {
    return {
      tab: this.tabs[0]
    };
  },
  methods: {
    open(tabName) {
      this.tabs.forEach(tab => {
        if (tab.name === tabName) {
          this.tab = tab;
          this.$emit("open", tab.name);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.kirby-tabs-dropdown-toggle {
  position: relative;
}
.kirby-tabs-dropdown-toggle::after {
  position: absolute;
  content: "";
  left: 1rem;
  right: 1rem;
  bottom: -3px;
  height: 3px;
  background: $color-dark;
}
.kirby-tabs-dropdown-toggle::before {
  position: absolute;
  content: "";
  border-top: 4px solid $color-dark;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  bottom: -7px;
  left: 50%;
  margin-left: -4px;
}
</style>
