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

import Button from '../Buttons/Button/Button.vue';

export default {
  components: {
    'kirby-button': Button
  }
}

</script>

<style lang="scss">

.kirby-sandbox {

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

.kirby-table-headline {
  .kirby-headline {
    margin-bottom: 0;
  }
}

.kirby-table-pagination {
  margin-top: -.5rem;
}

.kirby-section-headline {
  position: relative;
}

</style>
