<template>

  <div>

    <kirby-table>
      <kirby-table-body>
        <kirby-table-row v-for="(user, index) in users" :key="user.id">
          <kirby-table-cell type="image" aria-hidden="true">
            <router-link :to="'/users/' + user.email" tabindex="-1"><kirby-image :src="user.image.url" :cover="true"></kirby-image></router-link>
          </kirby-table-cell>
          <kirby-table-cell type="link"><router-link :to="'/users/' + user.email">{{ user.firstName }}</router-link></kirby-table-cell>
          <kirby-table-cell type="link"><router-link :to="'/users/' + user.email" tabindex="-1">{{ user.email }}</router-link></kirby-table-cell>
          <kirby-table-cell type="button">

            <kirby-dropdown>
              <kirby-button
                icon="angle-down"
                alt="User Actions"
                @click="$refs['dropdown-' + index][0].toggle()">
              </kirby-button>
              <kirby-dropdown-content
                @action="action($event, user)"
                align="right"
                :ref="'dropdown-' + index"
                options="/options/user.json"
                :dark="true">
              </kirby-dropdown-content>
            </kirby-dropdown>

          </kirby-table-cell>
        </kirby-table-row>
      </kirby-table-body>
    </kirby-table>

    <kirby-pagination
      v-if="paginationData.hide !== true"
      v-bind="paginationData"
      align="center"
      :details="true"
      @paginate="paginate" />

    <kirby-user-remove-dialog ref="remove" />

  </div>

</template>

<script>

// Components
import Button from 'Buttons/Button/Button.vue';
import Dropdown from 'Navigation/Dropdown/Dropdown.vue';
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue';
import Image from 'Images/Image/Image.vue';
import Table from 'Layout/Table/Table.vue';
import TableBody from 'Layout/Table/TableBody.vue';
import TableRow from 'Layout/Table/TableRow.vue';
import TableCell from 'Layout/Table/TableCell.vue';
import UserRemoveDialog from 'Dialogs/User/UserRemoveDialog/UserRemoveDialog.vue';
import Pagination from 'Navigation/Pagination/Pagination.vue';

// API
import UsersQuery from '@/Api/UsersQuery.js';

export default {
  components: {
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-image': Image,
    'kirby-pagination': Pagination,
    'kirby-table': Table,
    'kirby-table-body': TableBody,
    'kirby-table-row': TableRow,
    'kirby-table-cell': TableCell,
    'kirby-user-remove-dialog': UserRemoveDialog
  },
  props: {
    role: {
      type: String,
      default: null
    },
    pagination: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 10,
          keys: false,
          hide: false
        }
      }
    }
  },
  data() {
    return {
      users: [],
      paginationData: this.pagination
    }
  },
  methods: {
    action(action, user) {
      switch(action) {
        case 'edit':
          this.$router.push('/users/' + user.email);
          break;
        case 'remove':
          this.$refs.remove.open(user.email);
          break;
      }
    },
    fetch() {

      const query = {
        role: this.role,
        pagination: {
          page:  this.paginationData.page,
          limit: this.paginationData.limit
        }
      };

      UsersQuery(query).then(function (response) {
        this.users = response.users;
        this.paginationData.total = response.pagination.total;
      }.bind(this));

    },
    paginate(pagination) {
      this.paginationData.page = pagination.page;
      this.fetch();
    }
  },
  watch: {
    role: function() {
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
}

</script>
