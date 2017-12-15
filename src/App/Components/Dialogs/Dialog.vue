<template>
  <ui-dialog
    ref="ui"
    :size="size"
    :sticky="sticky"
    :state="state"
    :button="button"
    :icon="icon"
    @cancel="$emit('cancel')"
    @submit="$emit('submit')"
  >
    <slot />
    <template slot="footer">
      <slot name="footer" />
    </template>
  </ui-dialog>
</template>

<script>
import Dialog from 'Ui/Dialog/Dialog.vue'

export default {
  extends: Dialog,
  components: {
    'ui-dialog': Dialog
  },
  created () {
    this.$events.$on('key.escape', this.close, false);
  },
  destroyed () {
    this.$events.$off('key.escape', this.close, false);
  },
  watch: {
    isOpen (open) {
      if (open === true) {
        this.$refs.ui.open()
      } else {
        this.$refs.ui.close()
      }
    }
  }
}

</script>
