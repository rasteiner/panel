<template>
  <kirby-dialog ref="dialog" headline="Change URL" state="positive" button="Change" @submit="submit">
    <form @submit.prevent="submit" method="post">
      <kirby-fieldset :fields="[
        {
          name: 'slug',
          label: 'URL appendix',
          type: 'text',
          required: true,
          icon: 'chain',
          help: '/' + url
        },
      ]" :values="{slug: slug}" @input="sluggify($event.slug)" />
    </form>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import Page from 'App/Api/Page.js';
import slug from 'App/Helpers/slug.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      slug: null,
      url: null,
      page: {
        id: null,
        parent: null
      }
    };
  },
  methods: {
    sluggify (input) {

      this.slug = slug(input);

      if (this.page.parent) {
        this.url = this.page.parent + '/' + this.slug;
      } else {
        this.url = this.slug;
      }

    },
    open (id) {
      Page.get(id).then((page) => {
        this.page = page;
        this.sluggify(this.page.slug);
        this.$refs.dialog.open();
      });
    },
    submit () {

      if (this.slug === this.page.slug) {
        this.$refs.dialog.close();
        this.$store.dispatch('success', 'The URL stayed the same');
        return;
      }

      Page.slug(this.page.id, this.slug).then((page) => {
        this.$refs.dialog.close();
        this.$router.push('/pages/' + page.id);
        this.$store.dispatch('success', 'The URL has been changed to: /' + page.id);
      });

    }
  }
}

</script>
