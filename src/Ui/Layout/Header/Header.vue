<template>
  <header class="kirby-header">

    <kirby-bar class="kirby-header-breadcrumb-bar">
      <template slot="left">
        <kirby-breadcrumb>
          <kirby-breadcrumb-item class="kirby-header-menu-button">
            <kirby-button @click="$store.commit('menu', true)" icon="menu"></kirby-button>
          </kirby-breadcrumb-item>
          <kirby-breadcrumb-item :link="link" :title="label"><kirby-icon :type="icon" :alt="label" /></kirby-breadcrumb-item>
          <kirby-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :link="item.link">{{ item.label }}</kirby-breadcrumb-item>
        </kirby-breadcrumb>
      </template>
      <template slot="right">
        <kirby-pagination v-if="pagination" v-bind="pagination" />
      </template>
    </kirby-bar>

    <kirby-headline size="large"><slot /></kirby-headline>
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
  props: [
    'icon',
    'link',
    'label',
    'breadcrumb',
    'pagination'
  ]
}

</script>

<style lang="scss">

.kirby-header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;

  @media screen and (min-width: $breakpoint-medium) {
    margin-bottom: 3rem;
  }
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
.kirby-header-options-primary > .kirby-dropdown > .kirby-button .kirby-button-text {
  display: none;

  @media screen and (min-width: $breakpoint-medium) {
    display: inline-block;
  }

}

.kirby-header-menu-button {
  position: relative;
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

</style>
