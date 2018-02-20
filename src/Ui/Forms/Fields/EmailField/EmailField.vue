<script>
import TextField from "Ui/Forms/Fields/TextField/TextField.vue";

export default {
  extends: TextField,
  props: {
    type: {
      default: "email"
    }
  }
};
</script>
