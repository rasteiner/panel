<template>
  <div class="kirby-info-field">
    <kirby-headline>{{ label }}</kirby-headline>
    <kirby-txt>
      {{ text }}
    </kirby-txt>
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: 'Info'
    },
    name: {
      type: String,
      default: 'info'
    },
    type: {
      type: String,
      default: 'info'
    },
    text: {
      type: String
    }
  }
}

</script>
