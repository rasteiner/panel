<template>
  <header class="kirby-header">

    <kirby-bar class="kirby-header-breadcrumb-bar">
      <template slot="left">
        <kirby-breadcrumb>
          <kirby-breadcrumb-item class="kirby-header-menu-button">
            <kirby-button @click="$store.commit('menu', true)" icon="menu"></kirby-button>
          </kirby-breadcrumb-item>
          <kirby-breadcrumb-item class="kirby-header-view-button" :link="link" :title="label"><kirby-icon :type="icon" :alt="label" /></kirby-breadcrumb-item>
          <kirby-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :link="item.link">{{ item.label }}</kirby-breadcrumb-item>
        </kirby-breadcrumb>
      </template>
      <template slot="right">
        <kirby-prev-next v-if="pagination" v-bind="pagination" @prev="$emit('prev')" @next="$emit('next')" />
      </template>
    </kirby-bar>

    <kirby-headline size="large" :class="{'kirby-editable-headline': editable}">
      <slot />
      <kirby-button v-if="editable" icon="edit" @click="$emit('edit')" />
    </kirby-headline>
    <kirby-bar>
      <kirby-button-group class="kirby-header-options-primary" slot="left">
        <slot name="buttons-left" />
      </kirby-button-group>
      <kirby-button-group class="kirby-header-options-secondary" slot="right">
        <slot name="buttons-right" />
      </kirby-button-group>
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

.kirby-header-options-primary > .kirby-button .kirby-button-text,
.kirby-header-options-primary
  > .kirby-dropdown
  > .kirby-button
  .kirby-button-text {
  display: none;

  @media screen and (min-width: $breakpoint-medium) {
    display: inline-block;
  }
}

.kirby-breadcrumb-item.kirby-header-menu-button {
  position: relative;
}
.kirby-breadcrumb-item.kirby-header-view-button a,
.kirby-breadcrumb-item.kirby-header-menu-button {
  color: $color-dark;
  opacity: 1;
}

.kirby-header-menu-button span::after {
  [dir="ltr"] & {
    content: "›" !important;
  }
  [dir="rtl"] & {
    content: "‹" !important;
  }
}
@media screen and (min-width: $breakpoint-menu) {
  .kirby-header-menu-button {
    display: none;
  }
}

.kirby-headline.kirby-editable-headline > span {
  display: flex;
}
.kirby-headline.kirby-editable-headline > span .kirby-button {
  padding-left: 1rem;
  padding-right: 1rem;
  opacity: 0.2;
  transition: opacity 0.3s;
}
.kirby-headline.kirby-editable-headline > span .kirby-button:hover,
.kirby-headline.kirby-editable-headline > span .kirby-button:focus {
  opacity: 1;
}
</style>
