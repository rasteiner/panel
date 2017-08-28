<template>
  <kirby-dialog ref="dialog" headline="Delete page" state="negative" button="Delete" @submit="submit">
    <kirby-txt>
      Do you really want to delete <br><strong>{{ page.title }}</strong>?
    </kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import PageQuery from 'App/Api/PageQuery.js';

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
      PageQuery(id).then(function(page) {
        this.page = page;
        this.$refs.dialog.open();
      }.bind(this));
    },
    submit () {
      this.$store.dispatch('success', 'The page has been deleted');

      if (this.$route.path === this.page.link) {
        this.$router.push('/pages/' + this.page.parent.id);
      }
    }
  }
}

</script>
