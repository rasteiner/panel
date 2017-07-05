<template>

  <kirby-cards v-if="layout == 'cards'">
    <kirby-card v-for="file in files"
      :key="file.filename"
      :image="{url: file.url}"
      :text="file.filename"
      :info="file.niceSize"
      :link="file.link"
      options="/mock/data/file-options.json"
      @action="$emit('action', $event, file)">
    </kirby-card>
  </kirby-cards>

  <kirby-table v-else>
    <kirby-table-body>
      <kirby-table-row v-for="(file, index) in files" :key="file.filename">
        <kirby-table-cell type="image">
          <a href=""><kirby-image :src="file.url" :cover="true"></kirby-image></a>
        </kirby-table-cell>
        <kirby-table-cell><a href="">{{ file.filename }}</a></kirby-table-cell>
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
              options="/mock/data/file-options.json"
              :dark="true">
            </kirby-dropdown-content>
          </kirby-dropdown>

        </kirby-table-cell>
      </kirby-table-row>
    </kirby-table-body>
  </kirby-table>

</template>

<script>

import Button from 'Buttons/Button/Button.vue';
import Card from 'Layout/Card/Card.vue';
import Cards from 'Layout/Cards/Cards.vue';
import Dropdown from 'Navigation/Dropdown/Dropdown.vue';
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue';
import Image from 'Images/Image/Image.vue';
import Table from 'Layout/Table/Table.vue';
import TableBody from 'Layout/Table/TableBody.vue';
import TableRow from 'Layout/Table/TableRow.vue';
import TableCell from 'Layout/Table/TableCell.vue';

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
  props: ['files', 'layout']
}

</script>
