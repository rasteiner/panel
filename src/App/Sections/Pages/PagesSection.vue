<template>
  <section class="kirby-pages-section">

    <kirby-headline>
      {{ headline }}
      <kirby-button-group slot="options">
        <kirby-button v-show="!isLoading" icon="add" @click="action(null, 'create')">Add</kirby-button>
      </kirby-button-group>
    </kirby-headline>

    <template v-if="isLoading">
      <kirby-skeleton type="list" />
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

      <kirby-page-create-dialog ref="create" @success="$emit('create')" />
      <kirby-page-url-dialog    ref="url"    @success="$emit('url')" />
      <kirby-page-status-dialog ref="status" @success="$emit('status')" />
      <kirby-page-remove-dialog ref="remove" @success="$emit('remove')" />

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
      layout: 'list',
      items: [],
      pagination: {},
      query: this.config,
      headline: this.config.headline,
      isLoading: true
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
        this.items      = response.items;
        this.pagination = response.pagination;
        this.layout     = response.layout || 'list';
        this.isLoading  = false;
        this.$store.dispatch('isLoading', false);
      });

    },
    action (page, action) {
      switch (action) {
        case 'preview':
          window.open(page.url);
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
