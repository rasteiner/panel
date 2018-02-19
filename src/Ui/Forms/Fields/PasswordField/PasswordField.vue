<script>
import TextField from "Ui/Forms/Fields/TextField/TextField.vue";

export default {
  extends: TextField,
  props: {
    name: {
      default: "password"
    },
    type: {
      default: "password"
    },
    label: {
      default: "Password"
    },
    icon: {
      default: "key"
    }
  }
};
</script>
