<template>
  <bar>
    <template slot="left">
      <breadcrumb>
        <breadcrumb-item v-for="(item, index) in breadcrumb" 
          :key="index"
          :link="item.link">
          {{ item.text }}
        </breadcrumb-item>
      </breadcrumb>
    </template>
    <template slot="right">
      <btns>
        <dropdown v-for="(action, actionIndex) in actions" :key="actionIndex">
          <btn :icon="action.icon" @click="actionClick(action)" :upload="action.upload">{{ action.text }}</btn>
          <dropdown-content v-if="action.dropdown" align="right" :dark="true" :ref="action.icon">
            <dropdown-item v-for="(dropdownItem, dropdownIndex) in action.dropdown" 
              :key="dropdownIndex" 
              :upload="dropdownItem.upload" 
              :icon="dropdownItem.icon"
              @click="dropdownClick(dropdownItem)">
              {{ dropdownItem.text }}
            </dropdown-item>
          </dropdown-content>
        </dropdown>
        <languages v-if="languages"></languages>
      </btns>
    </template>
  </bar>
</template>

<script>

import Bar from '../Bar/Bar.vue'
import Breadcrumb from '../Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '../Breadcrumb/BreadcrumbItem.vue'
import Btns from '../Buttons/Buttons.vue'
import Btn from '../Button/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownContent from '../Dropdown/DropdownContent.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import Languages from '../Languages/Languages.vue'

export default {
  name: 'action-bar',
  components: {
    'bar': Bar,
    'breadcrumb': Breadcrumb,
    'breadcrumb-item': BreadcrumbItem,
    'btns': Btns,
    'btn': Btn,
    'dropdown': Dropdown,
    'dropdown-content': DropdownContent,
    'dropdown-item': DropdownItem,
    'languages': Languages
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
