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
    text: {
      type: String
    }
  }
}

</script>
