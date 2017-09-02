<template>
  <div class="kirby-checkboxes-input">
    <kirby-checkbox-input
    v-for="(option, index) in options"
    :key="index"
    :value="data.indexOf(option.value) !== -1"
    :label="option.text"
    @input="input($event, index)"
     />
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      data: this.value
    }
  },
  watch: {
    data (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    input (value, index) {
      let option = this.options[index].value;
      if (value === true) {
        this.data.push(option)
      } else {
        this.data = this.data.filter(item => item !== option)
      }
    }
  }

}

</script>
