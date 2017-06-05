<template>
  <div class="panel-txt">
    <slot />
  </div>
</template>

<script>

export default {
}

</script>

<style>

.panel-txt {
  line-height: 1.5em;
}
.panel-txt p {
  margin-bottom: 1.5em;
}
.panel-txt strong, 
.panel-txt b {
  font-weight: 500;
}

</style>
