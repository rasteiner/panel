<template>
  <kirby-bar :dark="true">
    <kirby-dropdown slot="left">
      <kirby-button icon="bars" @click="$refs.menu.toggle()">Menu</kirby-button>
      <kirby-dropdown-content ref="menu">
        <kirby-dropdown-item icon="file-o" link="/page">Pages</kirby-dropdown-item>
        <kirby-dropdown-item icon="cog" link="/options">Options</kirby-dropdown-item>
        <kirby-dropdown-item icon="user" link="/users">Users</kirby-dropdown-item>
        <kirby-dropdown-item icon="power-off" link="/login">Logout</kirby-dropdown-item>
      </kirby-dropdown-content>
    </kirby-dropdown>
    <kirby-button slot="right" icon="search">Search</kirby-button>
  </kirby-bar>
</template>

<script>

import Bar from '../Bar/Bar.vue'
import Button from '../Button/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownContent from '../Dropdown/DropdownContent.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'

export default {
  components: {
    'kirby-bar': Bar,
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem
  }
}

</script>