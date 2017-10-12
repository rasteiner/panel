<template>
  <kirby-button-group class="kirby-prev-next" :data-align="align">
    <kirby-button :disabled="!prev" @click="$emit('prev')" icon="angle-left" :alt="prevLabel"></kirby-button>
    <kirby-button :disabled="!next" @click="$emit('next')" icon="angle-right" :alt="nextLabel"></kirby-button>
  </kirby-button-group>
</template>

<script>

const PaginationKeysListener = function (e) {

  switch (e.code) {
    case 'ArrowLeft':
      this.prev();
      break;
    case 'ArrowRight':
      this.next();
      break;
  }

}

export default {
  props: {
    align: {
      type: String,
      default: 'left'
    },
    keys: {
      type: Boolean,
      default: false
    },
    prev: {
      type: Boolean,
      default: false
    },
    prevLabel: {
      type: String,
      default: 'Previous'
    },
    next: {
      type: Boolean,
      default: false
    },
    nextLabel: {
      type: String,
      default: 'Next'
    }
  },
  created() {
    if (this.keys === true) {
      window.addEventListener('keydown', PaginationKeysListener.bind(this), false)
    }
  },
  destroyed() {
    window.removeEventListener('keydown', PaginationKeysListener, false)
  }
}

</script>

<style lang="scss">

.kirby-prev-next {
  user-select: none;
}
.kirby-prev-next .kirby-button {
  padding: 1rem !important;
}
.kirby-prev-next[data-align="center"] {
  text-align: center;
}
.kirby-prev-next[data-align="right"] {
  [dir="ltr"] & {
    text-align: right;
  }
  [dir="rtl"] & {
    text-align: left;
  }
}

</style>
