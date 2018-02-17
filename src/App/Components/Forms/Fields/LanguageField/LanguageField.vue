<template>
  <kirby-select-field
    v-bind="$props"
    :options="languages"
    :value="state"
    @input="input" />
</template>

<script>
import Locale from "Api/Locale.js";
import Select from "Ui/Forms/Fields/SelectField/SelectField.vue";

export default {
  extends: Select,
  props: {
    name: {
      default: "language"
    },
    label: {
      default: "Language"
    },
    icon: {
      default: "globe"
    }
  },
  data() {
    return {
      state: this.value,
      languages: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      Locale.list().then(locales => {
        this.languages = locales.data.map(locale => ({
          value: locale.id,
          text: locale.name
        }));

        this.languages.unshift({
          value: "",
          text: "Please select a language…",
          disabled: true
        });
      });
    }
  }
};
</script>
