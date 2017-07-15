<template>
  <kirby-dropdown>
    <kirby-button icon="globe" alt="Switch Language" @click="$refs.language.toggle()">EN</kirby-button>
    <kirby-dropdown-content align="right" :dark="true" ref="language">
      <kirby-dropdown-item v-for="(language, index) in languages" :key="index" icon="globe">{{ language }}</kirby-dropdown-item>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>

import Button from 'Buttons/Button/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownContent from '../Dropdown/DropdownContent.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'

export default {
  components: {
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem 
  },
  data: function () {
    return {
      languages: ['EN', 'DE']
    }
  }
}

</script>
