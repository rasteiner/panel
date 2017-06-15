<template>
  <div class="kirby-sandbox">
    <slot />
  </div>
</template>

<script>

import Breadcrumb from '../Navigation/Breadcrumb/Breadcrumb.vue';
import BreadcrumbItem from '../Navigation/Breadcrumb/BreadcrumbItem.vue';
import Button from '../Buttons/Button/Button.vue';
import ButtonGroup from '../Buttons/ButtonGroup/ButtonGroup.vue';
import Headline from '../Text/Headline/Headline.vue';
import Icon from '../Images/Icon/Icon.vue';
import Grid from '../Layout/Grid/Grid.vue';
import Column from '../Layout/Grid/Column.vue';
import Card from '../Layout/Card/Card.vue';

export default {
  components: {
    'kirby-breadcrumb': Breadcrumb,
    'kirby-breadcrumb-item': BreadcrumbItem,
    'kirby-button-group': ButtonGroup,
    'kirby-button': Button,
    'kirby-headline': Headline,
    'kirby-icon': Icon,
    'kirby-grid': Grid,
    'kirby-column': Column,
    'kirby-card': Card
  }
}

</script>

<style lang="scss">

.kirby-sandbox {
  padding: 3rem;
}

.kirby-sandbox .kirby-bar {
  height: auto;
  background: none;

  .kirby-bar-slot {
    padding: 0;
  }
}
.kirby-sandbox header .kirby-headline {
  font-size: 1.75rem;
}
.kirby-sandbox header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1.5rem;
  margin-bottom: 3rem;
}
.kirby-sandbox .kirby-page-option {
  color: #777;
  font-size: .9rem !important;
}
.kirby-sandbox .kirby-page-option > .kirby-icon {
  color: #000;
  font-size: 14px;
}

.kirby-sandbox .breadcrumb-bar {
  margin-bottom: 1.5rem;
}
.kirby-sandbox .breadcrumb > li {
  display: inline-block;
  font-size: .9rem;
  color: #777;
  margin-right: .25rem;

  &:after {
    content: "/";
    margin-left: .6rem;
  }
}
.kirby-sandbox .breadcrumb > li > .kirby-icon {
  margin-left: .25rem;
  vertical-align: baseline;
  font-size: .8rem;
}

.kirby-sandbox .kirby-search-dropdown {

  input {
    border: 0;
    font: inherit;
    font-weight: 400;
    background: none;
    padding: .5rem 1rem;
    color: #fff;
    width: 15rem;

    &:focus {
      outline: 0;
    }
  }

}

</style>
