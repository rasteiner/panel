<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Create" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="page" @submit="submit" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";
import slug from "App/Helpers/slug.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      parent: null,
      section: null,
      templates: [],
      page: {
        title: null,
        template: null
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          icon: "title"
        },
        {
          name: "template",
          label: "Template",
          type: "select",
          required: true,
          options: this.templates
        }
      ];
    }
  },
  methods: {
    open(parent, section, options) {
      this.parent = parent;
      this.section = section;
      this.templates = options.template;
      this.page.template = options.template[0].value;
      this.$refs.dialog.open();
    },
    submit() {
      const data = {
        template: this.page.template,
        slug: slug(this.page.title),
        content: {
          title: this.page.title
        }
      };

      this.$api
        .post(this.parent + "/" + this.section, data)
        .then(page => {
          this.success({
            route: "/pages/" + page.id,
            message: "The page has been created",
            event: "page.create"
          });
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    }
  }
};
</script>
