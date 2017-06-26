<template>
  <header class="kirby-header">

    <kirby-bar class="kirby-header-breadcrumb-bar">
      <kirby-breadcrumb slot="left">
        <kirby-breadcrumb-item :link="link"><kirby-icon :type="icon" /></kirby-breadcrumb-item>
        <kirby-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :link="item.link">{{ item.label }}</kirby-breadcrumb-item>
      </kirby-breadcrumb>
      <kirby-pagination slot="right" v-if="pagination" v-bind="pagination" />
    </kirby-bar>

    <kirby-headline size="large"><slot /></kirby-headline>
    <kirby-bar>
      <kirby-button-group slot="left">
        <slot name="buttons-left" />
      </kirby-button-group>
      <kirby-button-group slot="right">
        <slot name="buttons-right" />
      </kirby-button-group>
    </kirby-bar>
  </header>
</template>

<script>

import Bar from '../../Bars/Bar/Bar.vue';
import Breadcrumb from '../../Navigation/Breadcrumb/Breadcrumb.vue';
import BreadcrumbItem from '../../Navigation/Breadcrumb/BreadcrumbItem.vue';
import ButtonGroup from '../../Buttons/ButtonGroup/ButtonGroup.vue';
import Pagination from '../../Navigation/Pagination/Pagination.vue';
import Headline from '../../Text/Headline/Headline.vue';
import Icon from '../../Images/Icon/Icon.vue';

export default {
  components: {
    'kirby-bar': Bar,
    'kirby-breadcrumb': Breadcrumb,
    'kirby-breadcrumb-item': BreadcrumbItem,
    'kirby-button-group': ButtonGroup,
    'kirby-pagination': Pagination,
    'kirby-headline': Headline,
    'kirby-icon': Icon
  },
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
  margin-bottom: 3rem;
}

.kirby-header .kirby-header-breadcrumb-bar {
  margin-bottom: 1.5rem;
  margin-top: -1rem;
}

.kirby-header .kirby-pagination {
  margin-right: -1rem;
}


</style>
