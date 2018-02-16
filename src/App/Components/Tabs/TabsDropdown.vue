<template>
  <kirby-dropdown>
    <kirby-button @click="$refs.tabs.toggle()" :key="tab.name + '-toggle'" :icon="tab.icon">{{ tab.label }}</kirby-button>
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
  data () {
    return {
      tab: this.tabs[0]
    };
  },
  methods: {
    open (tabName) {
      this.tabs.forEach((tab) => {
        if (tab.name === tabName) {
          this.tab = tab;
          this.$emit('open', tab.name)
        }
      });
    }
  }
};

</script>
