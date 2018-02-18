<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Change" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="{slug: slug}" @input="sluggify($event.slug)" @submit="submit" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";
import slug from "App/Helpers/slug.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      slug: null,
      url: null,
      page: {
        id: null,
        parent: null
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "slug",
          label: "URL appendix",
          type: "text",
          required: true,
          icon: "chain",
          help: "/" + this.url
        }
      ];
    }
  },
  methods: {
    sluggify(input) {
      this.slug = slug(input);

      if (this.page.parent) {
        this.url = this.page.parent.id + "/" + this.slug;
      } else {
        this.url = this.slug;
      }
    },
    open(id) {
      this.$api.page
        .get(id)
        .then(page => {
          this.page = page;
          this.sluggify(this.page.slug);
          this.$refs.dialog.open();
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    },
    submit() {
      if (this.slug === this.page.slug) {
        this.$refs.dialog.close();
        this.$store.dispatch("success", "The URL stayed the same");
        return;
      }

      if (this.slug.length === 0) {
        this.$store.dispatch("error", "Please enter a valid URL appendix");
        return;
      }

      this.$api.page
        .slug(this.page.id, this.slug)
        .then(page => {
          const payload = {
            message: "The URL has been changed to: /" + page.id,
            event: "page.change.slug"
          };

          // if in PageView, redirect
          if (this.page.id === this.$route.params.path.replace("+", "/")) {
            payload.route = "/pages/" + page.id;
          }

          this.success(payload);
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    }
  }
};
</script>
