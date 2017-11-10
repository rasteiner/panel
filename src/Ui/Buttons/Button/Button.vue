<template>
  <button
    type="button"
    class="kirby-button"
    @click="click"
    v-tab
    :disabled="disabled"
    :data-tabbed="tabbed"
    :data-state="state"
    :data-has-image="image ? true : false">
    <kirby-icon v-if="icon" :type="icon" :alt="alt"></kirby-icon>
    <img v-else-if="image" class="kirby-button-image" :src="image" :alt="alt || ''">
    <span v-if="$slots.default" class="kirby-button-text"><slot /></span>
  </button>
</template>

<script>

export default {
  props: [
    'alt',
    'icon',
    'image',
    'state',
    'link',
    'disabled'
  ],
  computed: {
    component: function () {
      return this.link ? 'router-link' : 'button'
    }
  },
  data() {
    return {
      tabbed: false
    }
  },
  methods: {
    click: function () {
      if (this.link) {
        this.$router.push(this.link)
      } else {
        this.$emit('click')
      }
    },
    tab: function ($event) {
      this.tabbed = true;
    },
    untab: function () {
      this.tabbed = false;
    }
  }
}

</script>

<style lang="scss">

.kirby-button {
  position: relative;
  background: none;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  line-height: inherit;
  border: 0;
  cursor: pointer;
  color: $color-dark-grey;
  transition: color .3s;

  &:focus,
  &:hover {
    outline: none;
    color: $color-dark;
  }

  &[data-tabbed] {
    @include focus-ring;
  }

  * {
    vertical-align: middle;
  }

  .kirby-icon {
    position: relative;
    color: $color-dark;
  }

  .kirby-icon ~ .kirby-button-text {
    [dir="ltr"] & {
      padding-left: .25rem;
    }
    [dir="rtl"] & {
      padding-right: .25rem;
    }
  }

}

.kirby-button[disabled] {
  pointer-events: none;
  opacity: .25;
}

.kirby-button[data-state="positive"] {
  color: $color-positive;

  &:hover {
    color: $color-dark;
  }

  .kirby-icon svg * {
    fill: $color-positive;
  }

}

.kirby-button[data-state="negative"] {
  color: $color-negative;

  &:hover {
    color: $color-dark;
  }

  .kirby-icon svg * {
    fill: $color-negative;
  }

}

.kirby-button[data-has-image] {
  width: 100%;

  [dir="ltr"] & {
    text-align: left;
  }
  [dir="rtl"] & {
    text-align: right;
  }

  .kirby-button-text {
    padding: 0;
  }
}

.kirby-button-image {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: -.5rem;
  margin-bottom: -.5rem;
  border-radius: 50%;
  background: $color-dark;
  object-fit: cover;

  [dir="ltr"] & {
    margin-right: .25rem;
    margin-left: 0;
  }
  [dir="rtl"] & {
    margin-right: 0;
    margin-left: .25rem;
  }
}

.kirby-button-text span,
.kirby-button-text b {
  vertical-align: baseline;
}

</style>
