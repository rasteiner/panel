<template>
  <div :class="selector">
    <div class="panel-bar-slot is-left"><slot name="left" /></div>
    <div class="panel-bar-slot is-center"><slot name="center" /></div>
    <div class="panel-bar-slot is-right"><slot name="right" /></div>
  </div>
</template>

<script>

export default {
  props: ['dark'],
  computed: {
    selector: function () {
      var selector = 'panel-bar'
      if (this.dark === true) {
        selector += ' is-dark'
      }
      return selector
    }
  }
}

</script>

<style>

.panel-bar {
  height: 3rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
}
.panel-bar.is-dark {
  color: #fff;
  background: #282c34;
}
.panel-bar-slot {
  flex-grow: 1;
  padding: 1rem 3rem;
}
.panel-bar-slot.is-center {
  text-align: center;
}
.panel-bar-slot.is-right {
  text-align: right;
}
.panel-bar-slot.is-left .panel-breadcrumb {
  margin-left: -1.5rem;
}

</style>
