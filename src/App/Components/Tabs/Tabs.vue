<template>
  <kirby-sections :parent="parent" :columns="tab.columns" @submit="$emit('submit', $event)" />
</template>

<script>
export default {
  props: {
    parent: String,
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
        }
      });
    }
  }
};
</script>
