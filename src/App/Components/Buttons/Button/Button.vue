<template>
  <ui-button
    :alt="alt"
    :icon="icon"
    :image="image"
    :state="state"
    :link="link"
    :disabled="disabled"
    @click="click"
  ><slot /></ui-button>
</template>

<script>
import Button from 'Ui/Buttons/Button/Button.vue'

export default {
  extends: Button,
  components: {
    'ui-button': Button
  },
  methods: {
    click () {
      if (this.link) {
        this.$router.push(this.link)
      } else {
        this.$emit('click')
      }
    }
  }
}

</script>
