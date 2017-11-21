<template>
  <div class="kirby-box" :state="state">
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
}

</script>

<style lang="scss">

.kirby-box {
  background: rgba(0,0,0, .075);
  border-radius: $border-radius;
  padding: .75rem 1rem;
  line-height: 1.5;
}

.kirby-box[state="empty"] {
  color: $color-light-grey;
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
