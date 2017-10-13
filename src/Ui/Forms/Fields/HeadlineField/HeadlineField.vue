<template>
  <kirby-headline class="kirby-headline-field">{{ label }}</kirby-headline>
</template>

<script>


export default {
  props: {
    label: {
      default: 'Headline'
    },
    type: {
      default: 'headline'
    }
  }
}

</script>

<style lang="scss">

  .kirby-headline-field {
    position:          relative;
    margin-bottom:     -.5rem;
    padding-top:       3rem;
    padding-left:      1.5em;
    border-bottom:     1px dotted $color-light-grey;
    counter-increment: count;
  }

  .kirby-headline-field::before {
    position:    absolute;
    content:     counter(count, decimal-leading-zero);
    bottom:      1px;
    left:        0;
    color:       $color-focus;
    font-family: $font-family-mono;
    font-weight: 400;
  }
</style>
