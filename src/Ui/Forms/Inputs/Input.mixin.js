
export default {
  props: ['value'],
  data () {
    return {
      data: this.value
    }
  },
  watch: {
    data () {
      this.$emit('input', this.data)
    }
  }
}
