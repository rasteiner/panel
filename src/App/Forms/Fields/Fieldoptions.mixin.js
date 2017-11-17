
export default {
  props: {
    options: {
      type: [Array, String],
      default: []
    },
    source: {
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
        case 'url':
          data.url = this.url;
          break;

        case 'source':
          data.query = this.source.query;
          data.page = this.$route.params.path;
          data.file = this.$route.params.filename;
          data.user = this.$route.params.id;
          data.value = this.source.value;
          data.text = this.source.text;
          break;

        default:
          type = 'source';
          data.query = this.options;
          data.page = this.$route.params.path;
          data.file = this.$route.params.filename;
          data.user = this.$route.params.id;
          break;
      }

      this.$api.panel.options(type, data).then((options) => {
        this.fieldoptions = options;
      })

    },
    fieldoptionsPage(page) {
      return page;
    }
  }
}
