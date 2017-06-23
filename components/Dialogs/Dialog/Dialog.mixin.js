import Dialog from './Dialog.vue';
import Fieldset from '../../Forms/Fieldset/Fieldset.vue';
import Txt from '../../Text/Txt/Txt.vue';

export default {
  components: {
    'kirby-dialog': Dialog,
    'kirby-fieldset': Fieldset,
    'kirby-txt': Txt
  },
  methods: {
    open() {
      this.$refs.dialog.open();
      this.$emit('open');
    },
    close() {
      this.$refs.dialog.close();
      this.$emit('close');
    }
  }
}
