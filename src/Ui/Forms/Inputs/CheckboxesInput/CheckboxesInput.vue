<template>
  <div class="kirby-checkboxes-input">
    <kirby-checkbox-input
    v-for="(option, index) in options"
    :key="index"
    :value="option.value"
    :label="option.text"
    v-model="data"
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
  }

}

</script>
