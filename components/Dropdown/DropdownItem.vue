<template>
  <btn class="panel-dropdown-item"
    :link="link" 
    :icon="icon" 
    :upload="upload" 
    :image="image" 
    @click="click">
    <slot />
  </btn>
</template>

<script>

import Button from '../Button/Button.vue'

export default {
  components: {
    'btn': Button
  },
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

<style>

.panel-dropdown-item {
  white-space: nowrap;
  padding: 1rem 2rem 1rem 1rem;
  line-height: 1;
  border-bottom: 1px solid #efefef;
  color: inherit;
  display: flex;
  width: 100%;
  align-items: center;
}
.panel-dropdown-item .panel-icon {
  width: 1.5rem;
  margin-right: .5rem;
  text-align: center;
}

</style>
