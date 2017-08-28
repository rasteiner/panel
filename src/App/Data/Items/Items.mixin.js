export default {
  props: {
    items: {
      type: Array,
      default () {
        return [];
      }
    },
    pagination: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  computed: {
    paginationOptions () {
      return Object.assign({
          page: 1,
          limit: 10,
          align: 'center',
          details: true,
          keys: false,
          hide: false,
          total: 0
      }, this.pagination);
    }
  }
};
