<template>
  <progress class="kirby-progress" :value="state" max="100"></progress>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      state: this.value
    }
  },
  methods: {
    set (value) {
      this.state = value;
    }
  }
}
</script>

<style lang="scss">

.kirby-progress {
  -webkit-appearance: none;
  width: 100%;
  height: .5rem;
  border-radius: 5rem;
}

.kirby-progress::-webkit-progress-bar {
  border: none;
  background: $color-border;
  height: .5rem;
  border-radius: 20px;
}

.kirby-progress::-webkit-progress-value {
  border-radius: 20px;
  background: $color-focus;
  transition: width .3s;
}

</style>
