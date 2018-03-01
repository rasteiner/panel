<template>
  <div class="kirby-info-field">
    <kirby-headline>{{ label }}</kirby-headline>
    <kirby-txt v-html="text" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    text: String
  }
};
</script>
