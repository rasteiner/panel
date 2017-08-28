<template>
  <kirby-text-block
    class="kirby-subheadline-block"
    @append="$emit('append', $event)"
    @remove="$emit('remove')"
    :value="value" />
</template>

<script>

export default {
  props: ['value']
}

</script>

<style lang="scss">

.kirby-subheadline-block .kirby-fancy-input {
  font-size: 1.25rem;
  font-weight: 500;
}

</style>
