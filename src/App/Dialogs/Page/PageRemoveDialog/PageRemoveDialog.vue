<template>
  <kirby-dialog ref="dialog" headline="Delete page" state="negative" icon="trash" button="Delete" @submit="submit">
    <kirby-txt>
      Do you really want to delete <br><strong>{{ page.title }}</strong>?
    </kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'App/Dialogs/Dialogs.mixin.js';

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
      this.$api.page.get(id).then((page) => {
        this.page = page;
        this.$refs.dialog.open();
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    },
    submit () {
      this.$api.page.delete(this.page.id).then(() => {

        if (this.$route.path === '/pages/' + this.page.id) {
          if (this.page.parent) {
            this.$router.push('/pages/' + this.page.parent);
          } else {
            this.$router.push('/pages');
          }
        }

        this.success({
          message: 'The page has been deleted',
          event: 'page.delete'
        });

      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    }
  }
}

</script>
