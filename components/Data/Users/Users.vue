<template>

  <div>

    <kirby-table>
      <kirby-table-body>
        <kirby-table-row v-for="(user, index) in users" :key="user.id">
          <kirby-table-cell type="image">
            <a href=""><kirby-image :src="user.image.url" :cover="true"></kirby-image></a>
          </kirby-table-cell>
          <kirby-table-cell><a href="">{{ user.username }}</a></kirby-table-cell>
          <kirby-table-cell><a href="">{{ user.email }}</a></kirby-table-cell>
          <kirby-table-cell type="button">

            <kirby-dropdown>
              <kirby-button 
                icon="angle-down" 
                @click="$refs['dropdown-' + index][0].toggle()">
              </kirby-button>
              <kirby-dropdown-content 
                @action="action" 
                align="right"
                :ref="'dropdown-' + index" 
                options="/mock/data/user-options.json" 
                :dark="true">        
              </kirby-dropdown-content>
            </kirby-dropdown>

          </kirby-table-cell>
        </kirby-table-row>
      </kirby-table-body>
    </kirby-table>
  
    <kirby-user-remove-dialog ref="remove" />

  </div>

</template>

<script>

import Button from '../../Buttons/Button/Button.vue';
import Dropdown from '../../Navigation/Dropdown/Dropdown.vue';
import DropdownContent from '../../Navigation/Dropdown/DropdownContent.vue';
import Image from '../../Images/Image/Image.vue';
import Table from '../../Layout/Table/Table.vue';
import TableBody from '../../Layout/Table/TableBody.vue';
import TableRow from '../../Layout/Table/TableRow.vue';
import TableCell from '../../Layout/Table/TableCell.vue';
import UserRemoveDialog from '../../Dialogs/User/UserRemoveDialog/UserRemoveDialog.vue';

export default {
  components: {
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-image': Image,
    'kirby-table': Table,
    'kirby-table-body': TableBody,
    'kirby-table-row': TableRow,
    'kirby-table-cell': TableCell,
    'kirby-user-remove-dialog': UserRemoveDialog
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    action(action) {

      switch(action) {
        case 'remove': 
          this.$refs.remove.open();              
      }

    }
  },
  created() {

    fetch('/mock/data/users.json').then(function (response) {
      return response.json()
    }).then(function (json) {
      this.users = json
    }.bind(this))

  }
}

</script>