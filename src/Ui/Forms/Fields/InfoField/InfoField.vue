<template>
  <kirby-txt>
    {{ text }}
  </kirby-txt>
</template>

<script>

export default {
  props: {
    name: {
      default: 'info'
    },
    type: {
      default: 'info'
    },
    text: {
      type: String
    }
  }
}

</script>
