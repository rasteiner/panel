<template>
  <div class="kirby-sandbox">
    <div class="menu">      
      <kirby-button icon="tachometer">Dashboard</kirby-button>
      <kirby-button icon="file-o">Pages</kirby-button>
      <kirby-button icon="user">Users</kirby-button>
      <kirby-button icon="power-off">Logout</kirby-button>
    </div>
    <div class="app">
      <slot />
    </div>
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

  .menu {
    position: fixed;
    display: none;
    width: 15rem;
    top: 0;
    left: 0;
    bottom: 0;
    background: $color-dark;
    padding: 3.25rem 0;

    .kirby-button {
      display: block;
      padding: .5rem 1rem;
      line-height: 1;
      font-size: 1rem;
      color: $color-light-grey;
    }

    .kirby-icon {
      width: 2rem;
      text-align: center;
      color: #fff;
    }

  }
  .app {
    margin-left: 0;
  }
}

.kirby-sandbox header .kirby-headline {
  font-size: 1.75rem;
}
.kirby-sandbox header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 3rem;
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
