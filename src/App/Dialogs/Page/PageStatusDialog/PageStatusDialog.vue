<template>
  <kirby-dialog ref="dialog" headline="Status" state="positive" button="Change" @submit="submit">
    <kirby-fieldset :fields="[
      {
        name: 'status',
        label: 'Select a new status',
        type: 'radio',
        required: true,
        options: [
          {
            value: 'draft',
            text: 'Draft',
            info: 'The page is invisible'
          },
          {
            value: 'unlisted',
            text: 'Unlisted',
            info: 'The page is only accessible via URL'
          },
          {
            value: 'public',
            text: 'Public',
            info: 'The page is public for anyone'
          }
        ]
      }
    ]" :values="{status: 'draft'}" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import Page from 'App/Api/Page.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      page: {
        id: null,
        status: null
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
      this.$store.dispatch('success', 'The page is now public');
    }
  }
}

</script>
