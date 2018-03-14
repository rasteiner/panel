<template>
  <div>
    <div class="kirby-publish-bar">
      <p class="kirby-publish-bar-text">This page has unpublished changes!</p>
      <nav class="kirby-publish-bar-buttons">
        <kirby-button icon="preview">Preview</kirby-button>
        <kirby-button icon="undo" state="negative">Discard</kirby-button>
        <kirby-button icon="smile" state="positive">Publish</kirby-button>
      </nav>
    </div>

    <kirby-sections :parent="parent" :columns="tab.columns" @submit="$emit('submit', $event)" />
  </div>
</template>

<script>
export default {
  props: {
    parent: String,
    tabs: Array
  },
  data() {
    return {
      tab: this.tabs[0] || {}
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

<style lang="scss">
.kirby-publish-bar {
  display: flex;
  align-items: center;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  border-radius: $border-radius;
  margin-top: -1.5rem;
  margin-bottom: 3rem;
  padding: 0 1rem;
  border-bottom: 1px solid $color-border;
  border-left: 1px solid $color-border;
  border-right: 1px solid $color-border;
  background: $color-inset;
}

.kirby-publish-bar-text {
  padding: 0.7rem 0;
  margin-right: 1rem;
  flex-grow: 1;
}
.kirby-publish-bar .kirby-button {
  padding: 0.5rem;
}
</style>
