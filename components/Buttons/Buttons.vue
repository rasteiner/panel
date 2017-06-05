<template>
  <div class="panel-buttons">
    <slot />
  </div>
</template>

<script>

export default {
}

</script>

<style>

.panel-buttons {  
  font-size: 0;
}
.panel-buttons > .panel-dropdown,
.panel-buttons > .panel-button {
  margin-left: .75rem;
  margin-right: .75rem;
  font-size: 1rem;
}
.panel-buttons > .panel-dropdown:first-child,
.panel-buttons > .panel-button:first-child {
  margin-left: 0;
}
.panel-buttons > .panel-dropdown:last-child,
.panel-buttons > .panel-button:last-child {
  margin-right: 0;
}

</style>
