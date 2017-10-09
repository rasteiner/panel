<template>
  <kirby-dialog ref="dialog" headline="Delete page" state="negative" icon="trash" button="Delete" @submit="submit">
    <kirby-txt>
      Do you really want to delete <br><strong>{{ page.title }}</strong>?
    </kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import Page from 'App/Api/Page.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      page: {
        title: null
      }
    };
  },
  methods: {
    open (id) {
      Page.get(id).then((page) => {
        this.page = page;
        this.$refs.dialog.open();
      });
    },
    submit () {
      Page.delete(this.page.id).then(() => {

        this.$store.dispatch('success', 'The page has been deleted');
        this.$emit('success');

        if (this.$route.path === this.page.link) {
          this.$router.push('/pages/' + this.page.parent.id);
        }

      });
    }
  }
}

</script>
