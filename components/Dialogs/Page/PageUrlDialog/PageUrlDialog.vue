<template>
  <kirby-dialog ref="dialog" headline="Change URL" state="positive" button="Change">
    <kirby-fieldset :fields="[
      {
        name: 'uid',
        label: 'URL appendix',
        type: 'text',
        required: true,
        icon: 'chain',
        help: '/about/blog/my-article/'
      },
    ]" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Dialogs/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin]
}

</script>
