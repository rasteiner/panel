<template>
  <section class="kirby-pages-section">

    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <template v-show="!isLoading">
          <kirby-button v-if="add" icon="add" @click="action(null, 'create')">Add</kirby-button>
        </template>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="isLoading">
      <kirby-skeleton type="list" />
    </template>
    <template v-else-if="error">
      <kirby-box>
        <strong>The section could not be loaded:</strong>
        {{ error }}
      </kirby-box>
    </template>
    <template v-else>

      <kirby-collection
        :layout="layout"
        :items="items"
        :pagination="pagination"
        @paginate="paginate"
        @action="action" />

      <kirby-box v-if="items.length === 0">
        <kirby-button>No entries</kirby-button>
      </kirby-box>

      <kirby-page-create-dialog ref="create" />
      <kirby-page-url-dialog    ref="url"    @success="fetch" />
      <kirby-page-status-dialog ref="status" @success="fetch" />
      <kirby-page-remove-dialog ref="remove" @success="fetch" />

    </template>

  </section>
</template>

<script>

export default {
  props: {
    self: String,
    config: Object
  },
  data () {
    return {
      add: null,
      layout: 'list',
      items: [],
      pagination: {},
      query: this.config,
      headline: null,
      isLoading: true,
      error: null
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch () {

      if (!this.query.self) {
        this.query.self = this.self;
      }

      this.$store.dispatch('isLoading', true);

      this.$api.section(this.query.type, this.query).then((response) => {
        this.add        = response.add;
        this.items      = response.items;
        this.pagination = response.pagination;
        this.headline   = response.headline;
        this.layout     = response.layout || 'list';
        this.isLoading  = false;
        this.$store.dispatch('isLoading', false);
      }).catch((error) => {
        this.isLoading = false;
        this.error     = error.message;
        this.$store.dispatch('isLoading', false);
      });

    },
    update (event) {

    },
    action (page, action) {
      switch (action) {
        case 'preview':
          window.open(page.url);
          break;
        case 'create':
          this.$refs.create.open(this.add);
          break;
        case 'url':
          this.$refs.url.open(page.id);
          break;
        case 'status':
          this.$refs.status.open(page.id);
          break;
        case 'remove':
          this.$refs.remove.open(page.id);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
      }
    },
    paginate (pagination) {
      this.query.pagination = Object.assign(this.query.pagination || {}, pagination);
      this.fetch();
    }
  }
};

</script>
