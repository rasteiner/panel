<template>
  <kirby-dialog ref="dialog" headline="Status" state="positive" button="Change" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="[
      {
        name: 'status',
        label: 'Select a new status',
        type: 'radio',
        required: true,
        options: [
          {
            value: 'unlisted',
            text: 'Unlisted',
            info: 'The page is only accessible via URL'
          },
          {
            value: 'listed',
            text: 'Public',
            info: 'The page is public for anyone'
          }
        ]
      }
    ]" :values="$data" @submit="submit" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import Page from 'App/Api/Page.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      page: {id: null},
      status: null
    };
  },
  methods: {
    open (id) {
      Page.get(id).then((page) => {
        this.page   = page;
        this.status = page.isVisible ? 'listed' : 'unlisted';
        this.$refs.dialog.open();
      });
    },
    submit () {
      this.$api.page.status(this.page.id, this.status, 1).then(() => {
        this.$store.dispatch('success', 'The page is now ' + this.status);
        this.$refs.dialog.close();
        this.$emit('success');
      });
    }
  }
}

</script>
