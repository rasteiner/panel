<template>
  <div class="kirby-box" :data-state="state" @click="$emit('click')">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.kirby-box {
  background: $color-inset;
  border-radius: $border-radius;
  padding: 0.65rem 1rem;
  line-height: 1.5;
  border: 1px solid $color-border;
}

.kirby-box[data-state="empty"] {
  font-family: $font-family-mono;
  font-size: $font-size-small;
}

.kirby-box .kirby-button {
  border: 1px solid transparent;
  line-height: 1;
  display: block;
  width: 100%;

  [dir="ltr"] & {
    text-align: left;
  }
  [dir="rtl"] & {
    text-align: right;
  }
}

.kirby-box > strong {
  font-weight: 500;
}
</style>
