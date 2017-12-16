
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
      fieldOptions: []
    }
  },
  mounted () {
    this.fetchOptions();
    this.$events.$on('page.update', this.fetchOptions);
    this.$events.$on('file.update', this.fetchOptions);
    this.$events.$on('user.update', this.fetchOptions);
  },
  destroyed: function () {
    this.$events.$off('page.update', this.fetchOptions);
    this.$events.$off('file.update', this.fetchOptions);
    this.$events.$off('user.update', this.fetchOptions);
  },
  watch: {
    options () {
      this.fetchOptions();
    }
  },
  methods: {
    fetchOptions () {

      if (Array.isArray(this.options)) {
        this.fieldOptions = this.options;
        return;
      }

      var type = this.options;
      const data = {
        page: this.$route.params.path,
        file: this.$route.params.filename,
        user: this.$route.params.id

      };

      switch (this.options) {
        case 'url':
          data.url = this.url;
          break;

        case 'source':
          data.query = this.source.query;
          data.value = this.source.value;
          data.text = this.source.text;
          data.flip = this.source.flip;
          break;

        default:
          type = 'source';
          data.query = this.options;
          break;
      }

      this.$api.panel.options(type, data).then((options) => {
        this.fieldOptions = options;
      })

    }
  }
}
