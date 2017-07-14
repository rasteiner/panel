<template>
  <div class="kirby-table-container">
    <table class="kirby-table">
      <slot />
    </table>
  </div>
</template>

<style lang="scss">

.kirby-table {
  width: 100%;
  line-height: 1.5em;
  margin: -2px 0;
  border-spacing: 0 2px;
  border-collapse: separate;
}

.kirby-table-container {
  display: table;
  width: 100%;
}

</style>
