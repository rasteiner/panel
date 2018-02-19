<script>
import TextField from "Ui/Forms/Fields/TextField/TextField.vue";

export default {
  extends: TextField,
  props: {
    name: {
      default: "phone"
    },
    type: {
      default: "tel"
    },
    icon: {
      default: "phone"
    },
    label: {
      default: "Phone"
    }
  }
};
</script>
