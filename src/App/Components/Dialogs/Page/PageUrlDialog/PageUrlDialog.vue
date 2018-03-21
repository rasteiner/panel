<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Change" @submit="$refs.form.submit()">
    <kirby-form ref="form" @submit="submit">
      <kirby-text-field v-bind="field" :value="slug" @input="sluggify($event)">
        <kirby-button slot="options" @click="sluggify(page.title)" icon="wand">Create from title</kirby-button>
      </kirby-text-field>
    </kirby-form>
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
        parent: null,
        title: null
      }
    };
  },
  computed: {
    field() {
      return {
        name: "slug",
        label: "URL appendix",
        type: "text",
        required: true,
        icon: "chain",
        help: "/" + this.url
      };
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
      this.$api.page.get(id).then(page => {
        this.page = page;
        this.sluggify(this.page.slug);
        this.$refs.dialog.open();
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

      this.$api.page.slug(this.page.id, this.slug).then(page => {
        const payload = {
          message: "The URL has been changed to: /" + page.id,
          event: "page.changeSlug"
        };

        // if in PageView, redirect
        if (
          this.$route.params.path &&
          this.page.id === this.$route.params.path.replace(/\+/g, "/")
        ) {
          payload.route = this.$api.page.link(page.id);
        }

        this.success(payload);
      });
    }
  }
};
</script>
