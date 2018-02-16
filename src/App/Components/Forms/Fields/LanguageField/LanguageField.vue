<template>
  <kirby-select-field
    :label="label"
    :name="name"
    :icon="icon"
    :help="help"
    :required="required"
    :readonly="readonly"
    :options="options"
    :value="state"
    @input="input" />
</template>

<script>
import Locale from "Api/Locale.js";
import Field from "Ui/Forms/Field/Field.mixin.js";

export default {
  mixins: [Field],
  props: {
    label: {
      default: "Language"
    },
    name: {
      default: "language"
    },
    icon: {
      default: "globe"
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      state: this.value,
      options: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      Locale.list().then(locales => {
        this.options = locales.data.map(locale => ({
          value: locale.id,
          text: locale.name
        }));

        this.options.unshift({
          value: "",
          text: "Please select a language…",
          disabled: true
        });
      });
    }
  }
};
</script>
