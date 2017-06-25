<template>
  <kirby-dialog ref="dialog" headline="Delete user" state="negative" button="Delete">
    <kirby-txt>Do you really want to delete this user?</kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from '../../Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin]
}

</script>