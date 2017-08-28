<template>
  <section>
    <kirby-fieldset :fields="fields" :values="values" />
  </section>
</template>

<script>

export default {
  props: [
    'fields',
    'values'
  ]
};

</script>
