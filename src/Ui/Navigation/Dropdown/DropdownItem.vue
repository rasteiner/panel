<template>
  <kirby-button class="kirby-dropdown-item"
    :link="link"
    :icon="icon"
    :upload="upload"
    :image="image"
    @click="click">
    <slot />
  </kirby-button>
</template>

<script>

export default {
  props: [
    'icon',
    'link',
    'image',
    'upload'
  ],
  methods: {
    click () {
      this.$parent.close()
      this.$emit('click')
    }
  }
}

</script>

<style lang="scss">

.kirby-dropdown-item {
  white-space: nowrap;
  line-height: 1;
  color: lighten($color-light-grey, 10%);
  display: flex;
  width: 100%;
  align-items: center;

  [dir="ltr"] & {
    padding: .5rem 1.5rem .5rem .5rem;
  }
  [dir="rtl"] & {
    padding: .5rem .5rem .5rem 1.5rem;
  }
}

.kirby-dropdown-item:hover,
.kirby-dropdown-item:focus {
  color: #fff;
}

.kirby-dropdown-item .kirby-icon {
  width: 2rem;
  text-align: center;
}

.kirby-dropdown-item .kirby-icon svg * {
  fill: #fff;
}

</style>
