<template>
  <dropdown>
    <btn icon="globe" @click="$refs.language.toggle()">EN</btn>
    <dropdown-content align="right" :dark="true" ref="language">
      <dropdown-item v-for="(language, index) in languages" :key="index" icon="globe">{{ language }}</dropdown-item>
    </dropdown-content>
  </dropdown>
</template>

<script>

import Button from '../Button/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownContent from '../Dropdown/DropdownContent.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'

export default {
  components: {
    'btn': Button,
    'dropdown': Dropdown,
    'dropdown-content': DropdownContent,
    'dropdown-item': DropdownItem 
  },
  data: function () {
    return {
      languages: ['EN', 'DE']
    }
  }
}

</script>
