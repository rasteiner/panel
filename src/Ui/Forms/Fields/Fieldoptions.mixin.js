
export default {
  props: {
    options: {
      type: [Array, String],
      default: []
    },
    field: {
      type: Object
    },
    query: {
      type: Object
    },
    url: {
      type: String
    }
  },
  data () {
    return {
      fieldoptions: []
    }
  },
  mounted () {
    this.fetchOptions();
    this.$events.$on('page.update', this.fetchOptions);
  },
  destroyed: function () {
    this.$events.$off('page.update', this.fetchOptions);
  },
  methods: {
    fetchOptions () {

      if (Array.isArray(this.options)) {
        this.fieldoptions = this.options;
        return;
      }

      var type = this.options;
      const data = {};

      switch (this.options) {
        case 'field':
          data.page = this.field.page;
          data.field = this.field.name;
          data.separator = this.field.separator;
          break;

        case 'url':
          data.url = this.url;
          break;

        case 'query':
          data.page = this.query.page;
          data.fetch = this.query.fetch;
          data.value = this.query.value;
          data.text = this.query.text;
          break;

        default:
          type = 'query';
          // data.page = '.'
          data.fetch = this.options
          break;
      }

      this.$api.panel.options(type, data).then((options) => {
        this.fieldoptions = options;
      })

    }
  }
}
