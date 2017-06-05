<template>
  <div class="panel-grid" :data-gutter="gutter">
    <slot />
  </div>
</template>

<script>

export default {
  props: ['gutter']
}

</script>

<style>

.panel-grid {
  display: flex;
  flex-wrap: wrap;
}

.panel-grid[data-gutter="line"] {
  margin-left: -2px;
}
.panel-grid[data-gutter="line"] > .panel-column {
  padding-left: 2px;
  padding-bottom: 2px;
}

.panel-grid[data-gutter="small"] {
  margin-left: -.5rem;
}
.panel-grid[data-gutter="small"] > .panel-column {
  padding-left: .5rem;
  padding-bottom: .5rem;
}

.panel-grid[data-gutter="medium"] {
  margin-left: -1rem;
}
.panel-grid[data-gutter="medium"] > .panel-column {
  padding-left: 1rem;
  padding-bottom: 1rem;
}

.panel-grid[data-gutter="large"] {
  margin-left: -1.5rem;
}
.panel-grid[data-gutter="large"] > .panel-column {
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
}

</style>
