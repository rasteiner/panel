<template>

  <div>

    <kirby-cards v-if="layout == 'cards'">
      <kirby-card v-for="page in pages"
        :key="page.id"
        :image="page.image"
        :text="page.title"
        :info="page.id"
        :link="page.link"
        menu-label="Page Actions"
        options="/options/page.json"
        @action="action(page, $event)">
      </kirby-card>
    </kirby-cards>

    <kirby-table v-else>
      <kirby-table-body>
        <kirby-table-row v-for="(page, index) in pages" :key="page.id">
          <kirby-table-cell type="image" aria-hidden="true">
            <router-link :to="page.link" tabindex="-1">
              <kirby-image :src="page.image.url" :cover="true"></kirby-image>
            </router-link>
          </kirby-table-cell>
          <kirby-table-cell type="link">
            <router-link :to="page.link">{{ page.title }}</router-link>
          </kirby-table-cell>
          <kirby-table-cell type="button">

            <kirby-dropdown>
              <kirby-button
                icon="angle-down"
                alt="Page Actions"
                @click="$refs['dropdown-' + index][0].toggle()">
              </kirby-button>
              <kirby-dropdown-content
                @action="action(page, $event)"
                align="right"
                :ref="'dropdown-' + index"
                options="/options/page.json"
                :dark="true">
              </kirby-dropdown-content>
            </kirby-dropdown>

          </kirby-table-cell>
        </kirby-table-row>
      </kirby-table-body>
    </kirby-table>

    <kirby-pagination
      v-if="query.pagination.hide !== true"
      v-bind="pagination"
      @paginate="paginate"
      :page="query.pagination.page"
      :total="total"
      />

    <kirby-page-url-dialog ref="url" />
    <kirby-page-remove-dialog ref="remove" />

  </div>

</template>

<script>

import ChildrenQuery from '@/Api/ChildrenQuery.js';

export default {
  props: {
    layout: {
      type: String,
      default: 'list'
    },
    parent: {
      type: String,
      default: '/'
    },
    pagination: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 10,
          keys: false,
          hide: false,
          align: 'center',
          details: true
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
      pages: [],
      total: 0,
      offset: this.pagination.page
    };
  },
  computed: {
    query() {
      return {
        parent: this.parent,
        filter: this.filter,
        sort: this.sort,
        pagination: {
          page:  this.offset,
          limit: this.pagination.limit,
        }
      };
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    query: function() {
      this.fetch();
    }
  },
  methods: {
    fetch(page) {
      ChildrenQuery(this.query).then((response) => {
        this.pages = response.pages;
        this.total = response.pagination.total;
      });
    },
    paginate(pagination) {
      this.offset = pagination.page;
    },
    action(page, action) {
      switch(action) {
        case 'preview':
          window.open(page.url);
          break;
        case 'url':
          this.$refs.url.open(page.id);
          break;
        case 'remove':
          this.$refs.remove.open(page.id);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    }
  }
}

</script>
