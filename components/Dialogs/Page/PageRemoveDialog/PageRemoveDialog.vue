<template>
  <kirby-dialog ref="dialog" headline="Delete page" state="negative" button="Delete">
    <kirby-txt>Do you really want to delete this page?</kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Dialogs/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin]
}

</script>
