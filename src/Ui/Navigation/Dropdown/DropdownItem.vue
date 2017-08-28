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
  methods: {
    click: function () {
      this.$parent.close()
      this.$emit('click')
    }
  },
  props: [
    'icon',
    'link',
    'image',
    'upload'
  ]
}

</script>

<style lang="scss">

.kirby-dropdown-item {
  white-space: nowrap;
  padding: .5rem 1.5rem .5rem .5rem;
  line-height: 1;
  color: inherit;
  display: flex;
  width: 100%;
  align-items: center;
}
.kirby-dropdown-item .kirby-icon {
  width: 2rem;
  text-align: center;
}

</style>
