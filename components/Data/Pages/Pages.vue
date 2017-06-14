<template>

  <kirby-cards v-if="layout == 'cards'">
    <kirby-card v-for="page in pages"
      :key="page.id"
      :image="page.image"
      :text="page.title"
      :info="page.id"
      :link="page.link"
      options="/mock/data/page-options.json"
      @action="$emit('action', $event, page)">
    </kirby-card>
  </kirby-cards>

  <kirby-table v-else>
    <kirby-table-body>
      <kirby-table-row v-for="(page, index) in pages" :key="page.id">
        <kirby-table-cell type="image">
          <a href=""><kirby-image :src="page.image.url" :cover="true"></kirby-image></a>
        </kirby-table-cell>
        <kirby-table-cell><a href="">{{ page.title }}</a></kirby-table-cell>
        <kirby-table-cell type="button">

          <kirby-dropdown>
            <kirby-button 
              icon="angle-down" 
              @click="$refs['dropdown-' + index][0].toggle()">
            </kirby-button>
            <kirby-dropdown-content 
              @action="$emit('action', $event)" 
              align="right"
              :ref="'dropdown-' + index" 
              options="/mock/data/page-options.json" 
              :dark="true">        
            </kirby-dropdown-content>
          </kirby-dropdown>

        </kirby-table-cell>
      </kirby-table-row>
    </kirby-table-body>
  </kirby-table>
  
</template>

<script>

import Button from '../../Buttons/Button/Button.vue';
import Card from '../../Layout/Card/Card.vue';
import Cards from '../../Layout/Cards/Cards.vue';
import Dropdown from '../../Navigation/Dropdown/Dropdown.vue';
import DropdownContent from '../../Navigation/Dropdown/DropdownContent.vue';
import Image from '../../Images/Image/Image.vue';
import Table from '../../Layout/Table/Table.vue';
import TableBody from '../../Layout/Table/TableBody.vue';
import TableRow from '../../Layout/Table/TableRow.vue';
import TableCell from '../../Layout/Table/TableCell.vue';

export default {
  components: {
    'kirby-button': Button,
    'kirby-card': Card,
    'kirby-cards': Cards,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-image': Image,
    'kirby-table': Table,
    'kirby-table-body': TableBody,
    'kirby-table-row': TableRow,
    'kirby-table-cell': TableCell
  },
  props: ['pages', 'layout']
}

</script>