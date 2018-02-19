<script>
import TextField from "Ui/Forms/Fields/TextField/TextField.vue";

export default {
  extends: TextField,
  props: {
    name: {
      default: "email"
    },
    type: {
      default: "email"
    },
    label: {
      default: "Email"
    },
    icon: {
      default: "email"
    },
    placeholder: {
      default: "mail@example.com"
    }
  }
};
</script>
