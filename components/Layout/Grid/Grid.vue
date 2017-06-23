<template>
  <div class="kirby-grid" :data-gutter="gutter">
    <slot />
  </div>
</template>

<script>

export default {
  props: ['gutter']
}

</script>

<style lang="scss">

.kirby-grid {
  display: flex;
  flex-wrap: wrap;
}

.kirby-grid[data-gutter="line"] {
  margin-left: -2px;
}
.kirby-grid[data-gutter="line"] > .kirby-column {
  padding-left: 2px;
  padding-bottom: 2px;
}

.kirby-grid[data-gutter="small"] {
  margin-left: 1rem;
}
.kirby-grid[data-gutter="small"] > .kirby-column {
  padding-left: 1rem;
  padding-bottom: 1rem;
}

.kirby-grid[data-gutter="medium"] {
  margin-left: -1.5rem;
}
.kirby-grid[data-gutter="medium"] > .kirby-column {
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
}

.kirby-grid[data-gutter="large"] {
  margin-left: -3rem;
}
.kirby-grid[data-gutter="large"] > .kirby-column {
  padding-left: 3rem;
  padding-bottom: 3rem;
}

</style>
