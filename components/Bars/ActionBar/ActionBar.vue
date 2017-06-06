<template>
  <kirby-bar>
    <template slot="left">
      <kirby-breadcrumb>
        <kirby-breadcrumb-item v-for="(item, index) in breadcrumb" 
          :key="index"
          :link="item.link">
          {{ item.text }}
        </kirby-breadcrumb-item>
      </kirby-breadcrumb>
    </template>
    <template slot="right">
      <kirby-button-group>
        <kirby-dropdown v-for="(action, actionIndex) in actions" :key="actionIndex">
          <kirby-button :icon="action.icon" @click="actionClick(action)" :upload="action.upload">{{ action.text }}</kirby-button>
          <kirby-dropdown-content v-if="action.dropdown" align="right" :dark="true" :ref="action.icon">
            <kirby-dropdown-item v-for="(dropdownItem, dropdownIndex) in action.dropdown" 
              :key="dropdownIndex" 
              :upload="dropdownItem.upload" 
              :icon="dropdownItem.icon"
              @click="dropdownClick(dropdownItem)">
              {{ dropdownItem.text }}
            </kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-languages v-if="languages"></kirby-languages>
      </kirby-button-group>
    </template>
  </kirby-bar>
</template>

<script>

import Bar from '../Bar/Bar.vue'
import Breadcrumb from '../../Navigation/Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '../../Navigation/Breadcrumb/BreadcrumbItem.vue'
import ButtonGroup from '../../Buttons/ButtonGroup/ButtonGroup.vue'
import Button from '../../Buttons/Button/Button.vue'
import Dropdown from '../../Navigation/Dropdown/Dropdown.vue'
import DropdownContent from '../../Navigation/Dropdown/DropdownContent.vue'
import DropdownItem from '../../Navigation/Dropdown/DropdownItem.vue'
import Languages from '../../Navigation/Languages/Languages.vue'

export default {
  components: {
    'kirby-bar': Bar,
    'kirby-breadcrumb': Breadcrumb,
    'kirby-breadcrumb-item': BreadcrumbItem,
    'kirby-button-group': ButtonGroup,
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem,
    'kirby-languages': Languages
  },
  props: [
    'breadcrumb',
    'actions',
    'languages'
  ],
  methods: {
    actionClick: function (action) {
      if (action.dropdown) {
        this.$refs[action.icon][0].toggle()
      } else if (action.click) {
        action.click()
      }
    },
    dropdownClick: function (item) {
      if (item.click) {
        item.click()
      }
    }
  }
}

</script>
