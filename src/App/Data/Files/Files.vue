<template>

  <div>

    <kirby-cards v-if="layout == 'cards'">
      <kirby-card v-for="file in files"
        :key="file.filename"
        :image="{url: file.url}"
        :text="file.filename"
        :info="file.niceSize"
        :link="file.link"
        menu-label="File Actions"
        options="/options/file.json"
        @action="action(file, $event)">
      </kirby-card>
    </kirby-cards>

    <kirby-table v-else>
      <kirby-table-body>
        <kirby-table-row v-for="(file, index) in files" :key="file.filename">
          <kirby-table-cell type="image" aria-hidden="true">
            <a href="" tabindex="-1"><kirby-image :src="file.url" :cover="true"></kirby-image></a>
          </kirby-table-cell>
          <kirby-table-cell type="link"><a href="">{{ file.filename }}</a></kirby-table-cell>
          <kirby-table-cell type="button">

            <kirby-dropdown>
              <kirby-button
                icon="angle-down"
                alt="File Actions"
                @click="$refs['dropdown-' + index][0].toggle()">
              </kirby-button>
              <kirby-dropdown-content
                @action="action(file, $event)"
                align="right"
                :ref="'dropdown-' + index"
                options="/options/file.json"
                :dark="true">
              </kirby-dropdown-content>
            </kirby-dropdown>

          </kirby-table-cell>
        </kirby-table-row>
      </kirby-table-body>
    </kirby-table>

    <kirby-pagination v-if="paginationData.hide !== true" align="center"
      @paginate="paginate"
      :details="true"
      :total="paginationData.total"
      :limit="paginationData.limit"
      :keys="paginationData.keys" />

    <kirby-file-remove-dialog ref="remove" />

  </div>

</template>

<script>

import FilesQuery from '@/Api/FilesQuery.js';

export default {
  props: {
    layout: {
      type: String,
      default: 'list'
    },
    parent: {
      type: String
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
    },
    sort: {
      type: String,
      default: null
    },
    filter: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      files: [],
      paginationData: this.pagination
    }
  },
  created() {
    this.fetch(1);
  },
  methods: {
    fetch (page) {

      const query = {
        parent: this.parent,
        sort: this.sort,
        filter: this.filter,
        pagination: {
          page: this.paginationData.page,
          limit: this.paginationData.limit
        }
      };

      FilesQuery(query).then(function (response) {
        this.files                = response.files;
        this.paginationData.total = response.pagination.total;
      }.bind(this));

    },
    paginate (pagination) {
      this.paginationData.page = pagination.page;
      this.fetch();
    },
    action (file, action) {
      switch (action) {
        case 'show':
          window.open(file.url);
          break;
        case 'remove':
          this.$refs.remove.open(file.filename);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    }
  }
}

</script>
