<template>
  <div class="kirby-card">
    <component :is="wrapper" :to="link">
      <kirby-image 
        :src="image.url" 
        :ratio="image.ratio || '3/2'" 
        back="black" 
        :cover="true">
      </kirby-image>
      <div class="kirby-card-content">
        <p class="kirby-card-text">{{ text }}</p>
        <p class="kirby-card-info">{{ info }}</p>
      </div>
    </component>
    <kirby-dropdown v-if="options">
      <kirby-button 
        class="kirby-card-options-button" 
        icon="angle-down" 
        @click="$refs.dropdown.toggle()">
      </kirby-button>
      <kirby-dropdown-content 
        @action="$emit('action', $event)" 
        align="right"
        ref="dropdown" 
        :options="options" 
        :dark="true">        
      </kirby-dropdown-content>
    </kirby-dropdown>
  </div>
</template>

<script>

import Button from '../../Buttons/Button/Button.vue';
import Image from '../../Images/Image/Image.vue';
import Dropdown from '../../Navigation/Dropdown/Dropdown.vue';
import DropdownContent from '../../Navigation/Dropdown/DropdownContent.vue';

export default {
  components: {
    'kirby-button': Button,
    'kirby-image': Image,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent
  },
  props: ['image', 'text', 'info', 'link', 'options'],
  computed: {
    wrapper: function() {
      return this.link ? 'router-link' : 'div';
    }
  }
}

</script>

<style lang="scss">

.kirby-card {
  position: relative;
}
.kirby-card-content {
  background: #fff;
  padding: 1rem;
  line-height: 1.5em;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}
.kirby-card .kirby-image {
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  overflow: hidden;
}
.kirby-card-text {
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kirby-card-info {
  color: $color-dark-grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: $font-size-small;
  font-family: $font-family-mono;
} 
.kirby-card .kirby-dropdown {
  position: absolute;
  bottom: 0;
  right: 0;
}
.kirby-card-options-button {
  padding: 1.05rem;
}

</style>
