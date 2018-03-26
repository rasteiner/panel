<template>
  <header class="kirby-header">
    <kirby-headline size="large" @click.native="$emit('edit')" :class="{'kirby-editable-headline': editable}">
      <slot />
    </kirby-headline>
    <kirby-bar>
      <kirby-button-group class="kirby-header-options-primary" slot="left">
        <slot name="buttons-left" />
      </kirby-button-group>
      <slot slot="right" class="kirby-header-options-secondary" name="buttons-right" />
    </kirby-bar>
  </header>
</template>

<script>
export default {
  props: ["editable", "icon", "link", "label", "breadcrumb", "pagination"]
};
</script>

<style lang="scss">
.kirby-header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
  padding-top: 4vh;
}

.kirby-header .kirby-header-breadcrumb-bar {
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

.kirby-header .kirby-pagination {
  [dir="ltr"] & {
    margin-right: -1rem;
  }
  [dir="rtl"] & {
    margin-left: -1rem;
  }
}

.kirby-header .kirby-headline {
  max-width: 35rem;
}
</style>
