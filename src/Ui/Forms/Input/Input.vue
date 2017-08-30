<template>
  <div class="kirby-input" :data-focus="isFocused" :data-error="error">
    <span v-if="$slots.prefix || prefix" class="kirby-input-prefix">
      <slot name="prefix">{{ prefix }}</slot>
    </span>
    <span class="kirby-input-content">
      <slot></slot>
    </span>
    <span v-if="$slots.icon || icon" @click="focus" class="kirby-input-icon">
      <slot name="icon">
        <kirby-icon :type="icon"></kirby-icon>
      </slot>
    </span>
  </div>
</template>

<script>

export default {
  props: ['error', 'prefix', 'icon'],
  data: function() {
    return {
      isFocused: false
    }
  },
  mounted: function() {

    this.$el.addEventListener('focus', function() {
      this.isFocused = true;
    }.bind(this), true);

    this.$el.addEventListener('blur', function() {
      this.isFocused = false;
    }.bind(this), true);

  },
  methods: {
    focus: function() {

      var input = this.$el.querySelector('input:first-child, textarea:first-child, select:first-child');

      if(input) {
        input.focus();
      }

    }
  }
}

</script>

<style lang="scss">

.kirby-input {
  display: flex;
  align-items: stretch;
  background: $color-white;
  border: 2px solid $color-border;
  border-radius: $border-radius;
}
.kirby-input[data-focus] {
  border-color: $color-focus;
  box-shadow: $box-shadow-focus;
}
.kirby-input[data-error] {
  border-color: $color-negative;
}
.kirby-input[data-error][data-focus] {
  border-color: $color-dark;
}
.kirby-input-prefix {
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: .8em;
  color: $color-dark-grey;
}
.kirby-input-content {
  flex-grow: 1;
  min-height: 2.5rem;
}
.kirby-input-content > input,
.kirby-input-content > textarea,
.kirby-input-content > .kirby-select-input {
  border: 0;
  font: inherit;
  line-height: 1.5em;
  padding: .5rem;
  width: 100%;
  resize: none;
  background: none;
}
.kirby-input-content > input:focus,
.kirby-input-content > textarea:focus {
  outline: 0;
}
.kirby-input-icon {
  width: 3rem;
  justify-content: center;
  align-items: center;
  color: $color-dark;
  display: none;

  @media screen and (min-width: $breakpoint-small) {
    display: flex;
  }
}

</style>
