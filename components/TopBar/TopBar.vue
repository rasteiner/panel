<template>
  <bar :dark="true">
    <dropdown slot="left">
      <btn icon="bars" @click="$refs.menu.toggle()">Menu</btn>
      <dropdown-content ref="menu">
        <dropdown-item icon="file-o" link="/page">Pages</dropdown-item>
        <dropdown-item icon="cog" link="/options">Options</dropdown-item>
        <dropdown-item icon="user" link="/users">Users</dropdown-item>
        <dropdown-item icon="power-off" link="/login">Logout</dropdown-item>
      </dropdown-content>
    </dropdown>
    <btn slot="right" icon="search">Search</btn>
  </bar>
</template>

<script>

import Bar from '../Bar/Bar.vue'
import Button from '../Button/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownContent from '../Dropdown/DropdownContent.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'

export default {
  components: {
    'bar': Bar,
    'btn': Button,
    'dropdown': Dropdown,
    'dropdown-content': DropdownContent,
    'dropdown-item': DropdownItem
  }
}

</script>