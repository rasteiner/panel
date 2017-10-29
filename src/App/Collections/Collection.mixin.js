export default {
  props: {
    headline: {
      type: String
    },
    layout: {
      type: String,
      default: 'list'
    },
    query: {
      type: Object,
      default() {
        return {};
      }
    },
    pagination: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 20
        };
      }
    }
  },
  data() {
    return {
      items: [],
      page: this.pagination.page,
      total: 0,
      isLoading: true
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    query: function() {
      this.fetch();
    }
  },
  computed: {
    paginationOptions () {
      return {
        ...this.pagination,
        page: this.page,
        total: this.total
      };
    }
  },
  methods: {
    fetch () {
    },
    paginate (pagination) {
      this.page = pagination.page;
      this.fetch();
    },
    action (item, action) {
      this.$store.dispatch('error', 'Not yet implemented');
    }
  }
};
