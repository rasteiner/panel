<template>
  <div class="panel-card">
    <component :is="wrapper" :to="link">
      <kirby-image :src="image.url" :ratio="image.ratio || '3/2'" back="black" :cover="true"></kirby-image>
      <div class="panel-card-content">
        <p class="panel-card-text">{{ text }}</p>
        <p class="panel-card-info">{{ info }}</p>
      </div>
    </component>
    <kirby-dropdown v-if="options">
      <kirby-button class="panel-card-options-button" icon="caret-down" @click="$refs.dropdown.toggle()"></kirby-button>
      <kirby-dropdown-content ref="dropdown" @action="$emit('action', $event)" :options="options" :dark="true" align="right"></kirby-dropdown-content>
    </kirby-dropdown>
  </div>
</template>

<script>

import Button from '../Button/Button.vue';
import Image from '../Image/Image.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
import DropdownContent from '../Dropdown/DropdownContent.vue';

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

<style>

.panel-card {
  position: relative;
  border-radius: 3px;
}
.panel-card-content {
  background: #fff;
  padding: 1rem;
  line-height: 1.5em;
}
.panel-card-text {
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.panel-card-info {
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} 
.panel-card .panel-dropdown {
  position: absolute;
  bottom: 0;
  right: 0;
}
.panel-card-options-button {
  padding: 1.05rem;
}

</style>
