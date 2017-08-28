export default {
  props: {
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
          limit: 10
        };
      }
    }
  },
  data() {
    return {
      items: [],
      page: this.pagination.page,
      total: 0
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
    setup () {
      return {
        layout: this.layout,
        items: this.items,
        pagination: Object.assign(this.pagination, {
          page: this.page,
          total: this.total
        })
      }
    }
  },
  methods: {
    fetch () {

    },
    paginate (pagination) {
      this.page = pagination.page;
    },
    action (item, action) {
      this.$store.dispatch('error', 'Not yet implemented');
    }
  }
};
