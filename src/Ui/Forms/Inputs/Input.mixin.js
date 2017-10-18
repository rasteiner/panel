
export default {
  props: ['value', 'name'],
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
